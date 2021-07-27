import "firebase/storage";
import "firebase/firestore";

import { useEffect, useState } from "react";

import firebase from "firebase/app";

import { useToast } from "@chakra-ui/toast";

import { file_ext, file_types } from "../utils/filetypes";

const useStorage = (file, path, userId) => {
  const [progress, setProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState({});
  const toast = useToast();

  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = firebase.storage().ref(`${userId}/${path}/${file.name}`);
    const collectionRef = firebase.firestore().collection(userId);
    const putFile = storageRef.put(file);

    putFile.on(
      "state_changed",
      snap => {
        setUploadTask(snap.task);
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      err => {
        switch (err.code) {
          case "storage/canceled":
            toast({
              title: "The upload was canceled",
              duration: 9000,
              isClosable: true,
              status: "error"
            });
            break;
        }
      },
      async () => {
        const url = await storageRef.getDownloadURL().catch(err => {
          toast({
            title: "An Error Occured !",
            description: err,
            duration: 9000,
            isClosable: true,
            status: "error"
          });
        });
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await collectionRef.add({
          url,
          createdAt,
          filetype: file_ext[file_types.indexOf(file.type)],
          filename: file.name,
          size: file.size
        });
        setUrl(url);
        toast({
          title: "File uploaded successfully !",
          duration: 4000,
          isClosable: true,
          status: "success"
        });
      }
    );
  }, [file]);

  return { progress, url, uploadTask };
};

export default useStorage;
