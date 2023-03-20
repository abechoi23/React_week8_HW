import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, collectionGroup, query } from "@firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext();

export const DataProvider = function (props) {
  const [posts, setPost] = useState([]);
  const [cars, setCars] = useState([]);
  const { user } = useContext(AuthContext)
  const db = getFirestore();
  console.log(posts);

  useEffect(() => {
    async function getPost() {
      const querySnapshot = await getDocs(collection(db, "posts"));
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

  useEffect(() => {
    async function getCars() {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const loadedCars = [];
      querySnapshot.forEach((doc) => {
        loadedCars.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCars(loadedCars);
    }
    getCars();
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
    const docRef = doc(db, "cars", carId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error();
    }
    return docSnap.data();
  }

  const value = {
    posts,
    getPost,
    cars,
    getCarData,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
