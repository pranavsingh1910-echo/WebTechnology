import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db.js";

import timezoneRoutes
  from "./routes/timezones.js";

import alarmRoutes
  from "./routes/alarms.js";

import settingsRoutes
  from "./routes/settings.js";

import eventRoutes
  from "./routes/events.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

/* DATABASE TEST */

app.get(
  "/api/health",
  async (req, res) => {

    try {

      await pool.query("SELECT 1");

      res.json({
        success: true,
        message:
          "API and MySQL are connected."
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Database connection failed.",
        error: error.message
      });

    }

  }
);

/* ROUTES */

app.use(
  "/api/timezones",
  timezoneRoutes
);

app.use(
  "/api/alarms",
  alarmRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
  "/api/events",
  eventRoutes
);

/* START SERVER */

app.listen(
  PORT,
  () => {

    console.log(
      `Backend running at http://localhost:${PORT}`
    );

  }
);