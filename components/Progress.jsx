import React, { useEffect, useState } from 'react';

import { Progress } from '@chakra-ui/progress';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile, userId }) => {
  const { progress, url, uploadTask } = useStorage(file, 'DOCS', userId);
  const [pause, setPause] = useState(false);

  function cancelUpload(e) {
    e.preventDefault();
    uploadTask.cancel();
    uploadTask.catch(() => console.log('Upload was canceled'));
    setFile(null);
  }

  function pause_resume_Upload(e) {
    e.preventDefault();
    setPause(!pause);
    if (pause) {
      uploadTask.resume();
    } else {
      uploadTask.pause();
    }
  }

  useEffect(() => {
    if (url) {
      setFile(null);
      return () => setFile(null);
    }
  }, [url]);

  return (
    <Modal isOpen={true} isCentered={true}>
      <ModalOverlay />
      <ModalContent mx={2}>
        <div
          className="w-full bg-gradient-to-tr from-dashbg via-cardbg to-indigo-darker shadow-2xl rounded-md border border-indigo-dark"
          key="modal"
        >
          <div className="flex justify-between gap-2 items-center mx-4 my-3 text-indigo-light">
            <p className="text-overflow">Uploading {file.name}</p>
            <p>{progress.toFixed(0)}%</p>
          </div>
          <Progress
            value={progress}
            size="xs"
            colorScheme="purple"
            mx={4}
            rounded="sm"
          />
          <div className="flex gap-4 p-4 mt-4 justify-end">
            <button
              className="px-3 py-2 bg-indigo-active rounded-md focus:outline-none"
              onClick={pause_resume_Upload}
            >
              {pause ? 'Resume' : 'Pause'}
            </button>
            <button
              className="px-3 py-2 bg-red rounded-md focus:outline-none"
              onClick={cancelUpload}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ProgressBar;
