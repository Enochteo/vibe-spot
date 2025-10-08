import React from "react";
import "../css/Event.css";

const Event = ({ title, date, image }) => {
  return (
    <article className="event-card">
      <img src={image} alt={title} className="event-img" />

      <div className="event-overlay">
        <div className="event-text">
          <h3>{title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {date}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Event;
