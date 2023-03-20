import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore";


export default function Car() {
  const [carData, setCarData] = useState({});
  const [loadingState, setLoadingState] = useState("LOADING");
  const [carId, setCarId] = useState(1);
  const [currSearch, setCurrSearch] = useState(1);
  const { getPost } = useContext(DataContext);
  const db = getFirestore

  useEffect(() => {
    async function handleLoad() {
        try {
            const data = await getPost(carId)
            setCarData(data)
            setLoadingState("LOADED");
        } catch(error) {
            console.log(error)
            setLoadingState("ERROR")
        }
    }
    handleLoad();
  }, [carId]);

  function incrementCarId(increment) {
    setCarId((prevCarId) => prevCarId + increment);
    setCurrSearch((prevSearch) => prevSearch + increment);
  }

  async function handleSearch(e) {
    e.preventDefault()
    const docRef = doc(db, "posts", currSearch.toString())
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        setCarId(currSearch)
    } else {
        alert("Car not found.")
    }
  }


  return (
    <div>
      <h1>Vehicle Search</h1>
      {
        <form onSubmit={handleSearch}>
          <input
            type="number"
            name="id"
            id="id"
            min={1}
            max={15}
            value={currSearch}
            onChange={(e) => setCurrSearch(parseInt(e.target.value))}
          />
          <button>Search</button>
        </form>
      }

      <h2>{carData.name}</h2>
      <p>Year: {carData.year}</p>
      <p>Price: ${carData.selling_price}</p>
      <div>
        {carData.hideLink ? (
          <></>
        ) : (
          <Link to={`/post/${carData.id}`}>Read More</Link>
        )}
      </div>
      {carId > 1 ? (
        <button onClick={() => incrementCarId(-1)}>Previous</button>
      ) : (
        <></>
      )}
      <button onClick={() => incrementCarId(1)}>Next</button>
    </div>
  );
  
}
