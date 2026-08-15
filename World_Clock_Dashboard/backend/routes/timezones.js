import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET TIMEZONES */

router.get(
  "/",
  async (req, res) => {

    try {

      const userId =
        req.query.user_id || 1;

      const [rows] =
        await pool.query(
          `SELECT *
           FROM timezones
           WHERE user_id = ?
           ORDER BY id`,
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

/* ADD TIMEZONE */

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        user_id = 1,
        city,
        country,
        flag = "🌍",
        timezone
      } = req.body;

      const [result] =
        await pool.query(
          `INSERT INTO timezones
          (user_id, city, country, flag, timezone)
          VALUES (?, ?, ?, ?, ?)`,
          [
            user_id,
            city,
            country,
            flag,
            timezone
          ]
        );

      const [rows] =
        await pool.query(
          `SELECT *
           FROM timezones
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

/* DELETE TIMEZONE */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await pool.query(
        `DELETE FROM timezones
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