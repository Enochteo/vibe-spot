import express from "express";
import eventController from "../controllers/events.js";

const router = express.Router();

router.get("/", eventController.getAllEvents);

export default router;
