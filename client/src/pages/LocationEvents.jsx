import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";
import fetchEvents from "../services/EventsAPI";
import fetchLocations from "../services/LocationsAPI";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const locationsData = await fetchLocations();
      if (locationsData && locationsData.length >= index) {
        setLocation(locationsData[index - 1]);
      }

      const eventsData = await fetchEvents();
      if (eventsData && eventsData.length > 0) {
        setEvents(
          eventsData.filter(
            (event) => Number(event.locationid) === Number(index)
          )
        );
      }
    })();
  }, [index]);

  return (
    <div
      className="location-events"
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          marginBottom: "32px",
        }}
      >
        <div className="location-image">
          <img
            src={location.image}
            alt={location.name}
            style={{
              borderRadius: "18px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              width: "220px",
              height: "220px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="location-info">
          <h2
            style={{
              color: "#fff",
              fontSize: "2.2em",
              fontWeight: 900,
              textShadow: "0 2px 8px #222",
              marginBottom: "8px",
              letterSpacing: "2px",
            }}
          >
            {location.name}
          </h2>
          <p
            style={{
              color: "#f8f8f8",
              textShadow: "0 2px 8px #222",
              fontSize: "1.1em",
            }}
          >
            {location.address}
          </p>
        </div>
      </header>

      <main
        className="location-events-main"
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            color: "#fff",
            textShadow: "0 2px 8px #222",
            fontSize: "2em",
            fontWeight: 900,
            letterSpacing: "2px",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          {location.name ? `Events at ${location.name}` : "Events"}
        </h2>

        {events && events.length > 0 ? (
          <div
            className="location-events-grid"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {events.map((event) => (
              <Event
                id={event.id}
                title={event.title}
                date={event.date}
                image={event.image}
              />
            ))}
          </div>
        ) : (
          <div
            className="location-events-empty"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "48px",
            }}
          >
            <i
              className="fa-regular fa-calendar-xmark fa-shake"
              style={{ fontSize: "2em", color: "#fff" }}
            ></i>
            <p
              style={{
                color: "#fff",
                marginTop: "12px",
                textShadow: "0 2px 8px #222",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              No events scheduled at this location yet!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
