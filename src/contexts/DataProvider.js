import { useState, useEffect, createContext, useContext } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "@firebase/firestore";

export const DataContext = createContext();

export const DataProvider = function (props) {
  const [posts, setPost] = useState([]);
  const db = getFirestore();
  console.log(posts);

  useEffect(() => {
    async function getPost() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      console.log(querySnapshot)
      const loadedPosts = [];
      querySnapshot.forEach((doc) => {
        loadedPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(loadedPosts);
    }
    getPost();
  }, []);

  async function getPost(id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error();
    }
    return docSnap.data();
  }

  async function getCarData(carId) {
    const response = await fetch(
      `https://my-json-server.typicode.com/Llang8/cars-api/cars/${carId}`
    );
    const data = await response.json();
    return data;
  }

  const value = {
    posts,
    getPost,
    getCarData,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
