import React, { useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      if (!condition.comparaValue || !condition.comparaValue.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.comparaValue
      );
    }

    const unsubscibe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });
    return unsubscibe;
  }, [collection, condition]);

  return documents;
};

export default useFirestore;
