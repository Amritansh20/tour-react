import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = (id) => {
    const newTours = tour.filter((tour) => tour.id !== id);
    setTour(newTours);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const response = await fetch(url);
      const tour = await response.json();
      setTour(tour);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (tour.length === 0) {
    return (
      <div className="title">
        <h3>no more tour to show</h3>
        <button className="btn" onClick={fetchData}>
          refresh
        </button>
      </div>
    );
  }

  return (
    <main>
      <Tours tour={tour} removeTour={removeTour}></Tours>
    </main>
  );
}

export default App;
