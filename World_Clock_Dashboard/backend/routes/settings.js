import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET SETTINGS */

router.get(
  "/:userId",
  async (req, res) => {

    try {

      const [rows] =
        await pool.query(
          `SELECT *
           FROM settings
           WHERE user_id = ?`,
          [req.params.userId]
        );

      res.json(
        rows[0] || null
      );

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);

/* UPDATE SETTINGS */

router.put(
  "/:userId",
  async (req, res) => {

    try {

      const {
        theme = "dark",
        time_format = "12",
        show_seconds = true
      } = req.body;

      await pool.query(
        `INSERT INTO settings
        (
          user_id,
          theme,
          time_format,
          show_seconds
        )
        VALUES (?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
          theme = VALUES(theme),
          time_format = VALUES(time_format),
          show_seconds = VALUES(show_seconds)`,
        [
          req.params.userId,
          theme,
          time_format,
          show_seconds
        ]
      );

      const [rows] =
        await pool.query(
          `SELECT *
           FROM settings
           WHERE user_id = ?`,
          [req.params.userId]
        );

      res.json(
        rows[0]
      );

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);

export default router;