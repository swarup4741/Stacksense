import "firebase/storage";
import "firebase/firestore";

import { useEffect, useState } from "react";

import firebase from "firebase/app";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

import { useAuth } from "../lib/auth";
import { uploadDate } from "../utils/date";
import { fileSize } from "../utils/filesize";

export const Docview = ({ doc }) => {
  const auth = useAuth();
  const toast = useToast();
  const [docTime, setDocTime] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const alertClose = () => setAlertOpen(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (doc.createdAt) {
      setDocTime(uploadDate(doc.createdAt.seconds));
    }
  }, [doc]);

  const NO_IMAGE_FILES = ["pdf", "doc", "xls"];

  const handleDelete = () => {
    alertClose();
    firebase
      .firestore()
      .collection(auth.user.uid)
      .doc(doc.id)
      .delete()
      .then(() => {
        firebase
          .storage()
          .ref(`${auth.user.uid}/DOCS/${doc.filename}`)
          .delete()
          .then(() => {
            toast({
              title: `${doc.filename} deleted successfully`,
              status: "success",
              duration: 4000,
              isClosable: true
            });
          });
      });
  };

  return (
    <motion.div
      layout
      id={doc.id}
      className="shadow-lg cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onOpen}
    >
      <div
        style={{ backgroundImage: "url('/assets/image.svg')" }}
        className="relative h-32 w-full rounded-t-md bg-cover bg-center"
      >
        <Image
          className="rounded-t-md p-0"
          src={
            NO_IMAGE_FILES.includes(doc.filetype)
              ? `/assets/${doc.filetype}.svg`
              : doc.url
          }
          quality={30}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          placeholder="blur"
        />
      </div>

      <div className="bg-gradient-to-tr from-dashbg via-cardbg to-indigo-darker py-2 px-3 rounded-b-md">
        <div>
          <p className="font-bold text-md text-overflow">{doc.filename}</p>
          <p className="text-sm text-indigo-light">{docTime.fullDate}</p>
        </div>
      </div>
      <Drawer isOpen={alertOpen} placement="top" onClose={alertClose}>
        <DrawerOverlay />
        <DrawerContent
          maxWidth="2xl"
          w="2xl"
          mx="auto"
          borderBottomRadius="md"
          bgGradient="linear(to-tr,#0B0B1F,#0A0A26,rgba(36, 0, 104))"
        >
          <DrawerHeader color="rgba(170, 139, 255)" py={3}>
            Delete {doc.filename} ?
          </DrawerHeader>
          <Divider />
          <DrawerBody color="whiteAlpha.800">
            Are you sure you want to delete it? Once deleted will remove it
            permanently from your drive
          </DrawerBody>
          <DrawerFooter>
            <button
              className="py-2 px-4 rounded-md bg-red mr-3 focus:outline-none"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="py-2 px-4 rounded-md bg-indigo-darker focus:outline-none"
              onClick={alertClose}
            >
              Cancel
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          maxWidth="2xl"
          w="2xl"
          mx="auto"
          borderBottomRadius="md"
          bgGradient="linear(to-tr,#0B0B1F,#0A0A26,rgba(36, 0, 104))"
        >
          <DrawerCloseButton _focus={{ outline: "none" }} />
          <DrawerHeader color="rgba(170, 139, 255)" py={3}>
            {doc.filename}
          </DrawerHeader>
          <Divider />
          <DrawerBody color="whiteAlpha.800">
            <p>
              Uploaded on {docTime.day} {docTime.fullDate} at {docTime.time}
            </p>
            <p>Type : {doc.filetype}</p>
            <p>Size : {fileSize(doc.size)}</p>
          </DrawerBody>
          <DrawerFooter>
            <a
              href={doc.url}
              target="_blank"
              className="px-4 py-2 bg-indigo rounded-md mr-4"
            >
              Open
            </a>
            <button
              className="px-4 py-2 bg-red rounded-md focus:outline-none"
              onClick={() => {
                onClose();
                setAlertOpen(true);
              }}
            >
              Delete
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
};
