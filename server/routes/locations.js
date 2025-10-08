import express from "express";
import LocationController from "../controllers/locations.js";

const router = express.Router();

router.get("/", LocationController.getAllLocations);

export default router;
