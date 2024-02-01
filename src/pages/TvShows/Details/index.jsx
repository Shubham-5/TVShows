import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./Details.css";

export default function Details() {
  const [show, setShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    formData.show = show.name;
    localStorage.setItem("userData", JSON.stringify(formData));
    toggleModal();
  };

  if (!show) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="show-details-container">
      <Link to="/" className="back-link">
        &lt; Back to Show List
      </Link>
      <div className="show-details-card">
        <img src={show.image.original} alt={show.name} />
        <div className="details">
          <h1>{show.name}</h1>
          <p>Rating: {show.rating.average || "N/A"}</p>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />

          <button onClick={toggleModal}>Book a Movie Ticket</button>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Booking Form</h2>
                <form onSubmit={handleBookingSubmit}>
                  <label htmlFor="name">Show Selected:</label>
                  <input
                    type="text"
                    id="show"
                    name="show"
                    value={show.name}
                    disabled
                  />

                  {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  <div className="modal-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={toggleModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
