import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET EVENTS */

router.get(
  "/",
  async (req, res) => {

    try {

      const userId =
        req.query.user_id || 1;

      const [rows] =
        await pool.query(
          `SELECT *
           FROM events
           WHERE user_id = ?
           ORDER BY event_date, event_time`,
          [userId]
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);

/* CREATE EVENT */

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        user_id = 1,
        title,
        description = "",
        event_date,
        event_time = null
      } = req.body;

      const [result] =
        await pool.query(
          `INSERT INTO events
          (
            user_id,
            title,
            description,
            event_date,
            event_time
          )
          VALUES (?, ?, ?, ?, ?)`,
          [
            user_id,
            title,
            description,
            event_date,
            event_time
          ]
        );

      const [rows] =
        await pool.query(
          `SELECT *
           FROM events
           WHERE id = ?`,
          [result.insertId]
        );

      res.status(201).json(
        rows[0]
      );

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);

/* DELETE EVENT */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await pool.query(
        `DELETE FROM events
         WHERE id = ?`,
        [req.params.id]
      );

      res.json({
        success: true
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);

export default router;