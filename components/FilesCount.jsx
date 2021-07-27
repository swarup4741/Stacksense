import { Progress } from '@chakra-ui/react';

import useCount from '../hooks/useCount';
import { fileSize } from '../utils/filesize';

const FilesCount = ({ userId }) => {
  const { filesCount, size } = useCount(userId);

  return (
    <div className="flex flex-col gap-6 md:flex-row items-center md:items-center md:gap-6">
      <div className="flex flex-col items-start space-y-1 ring-0 ring-offset-indigo ring-offset-1 bg-dashbg p-4 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <img src="/assets/storage.svg" alt="Storage left" />
          <p className="text-indigo-light font-bold">Storage</p>
        </div>
        <Progress
          size="xs"
          w="250px"
          maxW="xs"
          rounded="sm"
          isAnimated
          value={size / Math.pow(1024, 2)}
          colorScheme="purple"
          bg="#21025F"
        />
        <p className="text-indigo-light">{fileSize(size)} of 100 MB used</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="file-data-card">
          <p>Images</p>
          <p className="font-bold text-xl">
            {filesCount && filesCount.img_count}
          </p>
        </div>
        <div className="file-data-card">
          <p>Pdf</p>
          <p className="font-bold text-xl">
            {filesCount && filesCount.pdf_count}
          </p>
        </div>
        <div className="file-data-card">
          <p>Docs</p>
          <p className="font-bold text-xl">
            {filesCount && filesCount.doc_count}
          </p>
        </div>
        <div className="file-data-card">
          <p>Sheets</p>
          <p className="font-bold text-xl">
            {filesCount && filesCount.sheet_count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilesCount;
