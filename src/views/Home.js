import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Car() {
  const [carData, setCarData] = useState({});
  const [loadingState, setLoadingState] = useState("LOADING");
  const [carId, setCarId] = useState(1);
  const [currSearch, setCurrSearch] = useState(1);

  useEffect(() => {
    async function getCarData() {
      const response = await fetch(
        `https://my-json-server.typicode.com/Llang8/cars-api/cars/${carId}`
      );
      const data = await response.json();
      setCarData(data);
      setLoadingState("LOADED");
    }
    getCarData();
  }, [carId]);

  function incrementCarId(increment) {
    setCarId(carId + increment);
    setCurrSearch(carId + increment);
  }

  function handleSearch(e) {
    e.preventDefault();
    setCarId(currSearch);
  }

  return (
    <div>
      <h1>Vehicle Search</h1>
      {
        <form onSubmit={(e) => handleSearch(e)}>
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
