import React, { useState, useEffect } from "react";
function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://course-api.com/react-tours-project")
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const toggleShowFullText = (index) => {
    const newTours = [...tours];
    newTours[index].showFullText = !newTours[index].showFullText;
    setTours(newTours);
  };

  const handleDeleteTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    if (newTours.length === 0) {
      setIsRefresh(true);
    }
    setTours(newTours);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isRefresh) {
    return (
      <div className="refreshMain">
        <div className="refresh">
          <h1>No Tours Left</h1>
          <button
            className="refreshButton"
            onClick={() => window.location.reload(false)}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mainBox">
      {tours.map((tour, index) => (
        <div key={tour.id} className="tourBox">
          <img width={500} src={tour.image} alt={tour.name} />
          <div className="headerAndPrice">
            <div className="tourHeader">
              <h2 className="tourName">{tour.name}</h2>
            </div>
            <div>
              <p className="priceBox">${tour.price}</p>
            </div>
          </div>
          <p className="info">
            {tour.showFullText ? tour.info : `${tour.info.slice(0, 200)}...`}
            {!tour.showFullText && (
              <a href="#/" onClick={() => toggleShowFullText(index)}>
                {" "}
                Read More
              </a>
            )}
            {tour.showFullText && (
              <a href="#/" onClick={() => toggleShowFullText(index)}>
                {" "}
                Read Less
              </a>
            )}
          </p>

          <button
            onClick={() => handleDeleteTour(tour.id)}
            className="notInterested"
          >
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
