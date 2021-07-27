import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useToast } from '@chakra-ui/toast';

import useCount from '../hooks/useCount';
import useFirestore from '../hooks/useFirestore';
import { file_types } from '../utils/filetypes';
import Progress from './Progress';

const UploadForm = ({ userId }) => {
  const [file, setFile] = useState(null);
  const toast = useToast();
  const { docs } = useFirestore(userId);
  const { size } = useCount(userId);

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected) {
      if (docs.filter((doc) => doc.filename === selected.name).length) {
        toast({
          title: 'File already present',
          description: `${selected.name} is already present in your drive. Give it a search.`,
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        setFile(null);
        return;
      }
      if (
        file_types.includes(selected.type) &&
        selected.size <= 10 * 1024 * 1024
      ) {
        const totalSize = size + selected.size;
        if (totalSize <= 100 * 1024 * 1024) {
          setFile(selected);
        } else {
          toast({
            title: 'File upload interrupted !',
            description:
              'Oops! Looks like your Storage is full. you can delete some of your unneccessary files to make some space',
            status: 'error',
            duration: 12000,
            isClosable: true,
          });
          setFile(null);
          return;
        }
      } else {
        toast({
          title: 'File upload interrupted !',
          description:
            'Either file size was greater than 10MB (Allowed size is less than 10MB) or Invalid file type (Allowed types : png,jpg,jpeg,pdf,docx,xls)',
          duration: 12000,
          isClosable: true,
          status: 'error',
        });
        setFile(null);
      }
    } else {
      toast({
        title: 'No file was selected',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <form>
        <label>
          <input className="sr-only" type="file" onChange={handleChange} />
          <div className="flex gap-2 items-center px-4 py-2 ring-1 ring-indigo-dark bg-gradient-to-tr from-dashbg via-cardbg to-indigo-darker cursor-pointer rounded-md">
            <img src="/assets/upload.svg" />
            <p>Upload</p>
          </div>
        </label>
      </form>
      <AnimatePresence>
        {file && <Progress file={file} setFile={setFile} userId={userId} />}
      </AnimatePresence>
    </>
  );
};

export default UploadForm;
