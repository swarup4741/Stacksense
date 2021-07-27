import 'firebase/firestore';

import { useEffect, useState } from 'react';

import firebase from 'firebase/app';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(async () => {
    const unsub = firebase
      .firestore()
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];

        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
