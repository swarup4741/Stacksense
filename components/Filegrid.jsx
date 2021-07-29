import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";

import useCount from "../hooks/useCount";
import useFirestore from "../hooks/useFirestore";
import { Docview } from "./Docview";
import Search from "./Search";

const Filegrid = ({ userId }) => {
  const { docs } = useFirestore(userId);
  const [data, setData] = useState(true);
  const [storageWarn, setStorageWarn] = useState(false);
  const { size } = useCount(userId);

  useEffect(() => {
    let interval;

    if (!docs.length) {
      interval = setTimeout(() => setData(false), 1000);
    }

    return () => clearInterval(interval);
  }, [docs.length]);

  useEffect(() => {
    if (size >= 95 * 1024 * 1024) {
      setStorageWarn(true);
    }
  }, []);

  return docs.length ? (
    <>
      <Search docs={docs} />
      {storageWarn && (
        <Alert
          status="warning"
          variant="solid"
          position="fixed"
          top="0"
          zIndex="100"
        >
          <AlertIcon />
          <AlertTitle>Your Storage is almost full !</AlertTitle>
          <CloseButton
            _focusWithin={{ outline: "none", ring: "none" }}
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setStorageWarn(false)}
          />
        </Alert>
      )}
      <motion.div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
        {docs.map(doc => (
          <Docview doc={doc} key={doc.id} />
        ))}
      </motion.div>
    </>
  ) : data ? (
    <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(value => (
        <div key={value}>
          <Skeleton height="128px" />
          <SkeletonText mt="2" noOfLines={2} />
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-black absolute z-30 top-0 w-screen flex flex-col justify-center h-screen items-center">
      <img src="/assets/box.svg" alt="Empty drive fallback image of a box" />
      <div className="text-indigo-darker text-center">
        <p className="text-xl font-bold">There are no items here !</p>
        <p className="font-bold">Start adding your documents</p>
      </div>
    </div>
  );
};

export default Filegrid;
