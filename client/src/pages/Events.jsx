import React, { useState, useEffect } from "react";
import fetchEvents from "../services/EventsAPI";

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError("Could not load events.");
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return (
      <div className="Events">
        <p>Loading events...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="Events">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="Events"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3a0066 0%, #d91df2 100%)",
        paddingTop: "40px",
      }}
    >
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "2.5em",
          fontWeight: 900,
          marginBottom: "32px",
          textShadow: "0 2px 8px #222",
          letterSpacing: "2px",
        }}
      >
        All Upcoming Events
      </h2>
      <main
        className="events-main"
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              className="event-card"
              key={event.id}
              style={{
                background: "rgba(41, 194, 241, 0.72)",
                borderRadius: "18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                border: "2px solid #d91df2",
                width: "320px",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="event-image"
                style={{
                  height: "180px",
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderBottom: "1px solid #d91df2",
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ display: "none" }}
                />
              </div>
              <div
                className="event-details"
                style={{
                  padding: "24px 18px 18px 18px",
                  color: "#fff",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #222",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.4em",
                    fontWeight: 800,
                    marginBottom: "8px",
                    color: "#fff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #222",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontSize: "1em",
                    color: "#f8f8f8",
                    marginTop: 0,
                    textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #222",
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              color: "#e4dbdbff",
              fontSize: "1.2em",
              textAlign: "center",
              marginTop: "48px",
            }}
          >
            No events yet!
          </p>
        )}
      </main>
    </div>
  );
};
export default Events;
