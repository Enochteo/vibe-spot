import { pool } from "../config/database.js";

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vibes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error Fetching Events");
    res.status(409).json({ error: "Internal Server error" });
  }
};

export default {
  getAllEvents,
};
