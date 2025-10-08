import { pool } from "../config/database.js";

const getAllLocations = async (req, res) => {
  try {
    const getLocationsQuery = `SELECT * FROM vibeLocations`;
    const result = await pool.query(getLocationsQuery);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Could not fetch Locations", error);
    return res.status(409).json({ error: "Internal Server Error" });
  }
};

export default {
  getAllLocations,
};
