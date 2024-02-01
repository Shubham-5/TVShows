import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import "./List.css";

const List = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Fragment>
      <div className="header">
        <h1>TV Shows</h1>
      </div>
      <div className="show-list-container">
        <div className="show-list">
          {shows.map((show) => (
            <Link to={`${show.id}`} key={show.id} className="show-card">
              <img src={show.image.medium} alt={show.name} />
              <div className="show-details">
                <h2>{show.name}</h2>
                <p>Rating: {show.rating.average || "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default List;
