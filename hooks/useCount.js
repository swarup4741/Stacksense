import { useEffect, useState } from 'react';

import useFirestore from './useFirestore';

const useCount = (userId) => {
  const { docs } = useFirestore(userId);
  const [filesCount, setFilesCount] = useState({});
  const [size, setSize] = useState(0);

  useEffect(() => {
    let data_size = 0;
    docs.map((doc) => {
      data_size += doc.size;
    });

    setSize(data_size);

    const sheets = docs.filter((doc) => doc.filetype === 'xls');
    const pdfs = docs.filter((doc) => doc.filetype === 'pdf');
    const documents = docs.filter((doc) => doc.filetype === 'doc');

    setFilesCount({
      img_count: docs.length - (sheets.length + pdfs.length + documents.length),
      pdf_count: pdfs.length,
      doc_count: documents.length,
      sheet_count: sheets.length,
    });
  }, [docs]);

  return {
    filesCount,
    size,
  };
};

export default useCount;
