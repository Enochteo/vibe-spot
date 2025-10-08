import { pool } from "./database.js";
import "./dotenv.js";
import events from "../data/vibes.js";

const createTable = async () => {
  const createTablesQuery = `
  DROP TABLE IF EXISTS vibes;
  DROP TABLE IF EXISTS vibeLocations;

  CREATE TABLE IF NOT EXISTS vibeLocations(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  image TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS vibes(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  locationId INT,
  FOREIGN KEY (locationId) REFERENCES vibeLocations(id),
  description TEXT NOT NULL,
  image TEXT NOT NULL
  );
  `;
  try {
    await pool.query(createTablesQuery);
    console.log("💯Location and events tables successfully created");
  } catch (error) {
    console.log("Could not create tables", error);
  }
};

const seedData = async () => {
  await createTable();

  for (const location of events.locations) {
    const insertLocation = `INSERT INTO vibeLocations (name, address, image) VALUES ($1, $2, $3)`;
    const values = [location.name, location.address, location.image];
    try {
      await pool.query(insertLocation, values);
      console.log(`✅${location.name} successfully added`);
    } catch (err) {
      console.error("Could not add location", err);
    }
  }

  for (const event of events.events) {
    const insertEvent = `INSERT INTO vibes (title, date, locationId, description, image) VALUES ($1, $2, $3, $4, $5)`;
    const values = [
      event.title,
      event.date,
      event.locationId,
      event.description,
      event.image,
    ];
    try {
      await pool.query(insertEvent, values);
      console.log(`✔️${event.title} successfully added`);
    } catch (err) {
      console.error("Could not add event", err);
    }
  }
};

seedData();
