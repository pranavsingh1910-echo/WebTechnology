import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET ALARMS */

router.get(
  "/",
  async (req, res) => {

    try {

      const userId =
        req.query.user_id || 1;

      const [rows] =
        await pool.query(
          `SELECT *
           FROM alarms
           WHERE user_id = ?
           ORDER BY alarm_time`,
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

/* CREATE ALARM */

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        user_id = 1,
        alarm_time,
        label = "Alarm",
        enabled = true,
        repeat_type = "once"
      } = req.body;

      const [result] =
        await pool.query(
          `INSERT INTO alarms
          (
            user_id,
            alarm_time,
            label,
            enabled,
            repeat_type
          )
          VALUES (?, ?, ?, ?, ?)`,
          [
            user_id,
            alarm_time,
            label,
            enabled,
            repeat_type
          ]
        );

      const [rows] =
        await pool.query(
          `SELECT *
           FROM alarms
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

/* ENABLE / DISABLE */

router.put(
  "/:id",
  async (req, res) => {

    try {

      const {
        enabled
      } = req.body;

      await pool.query(
        `UPDATE alarms
         SET enabled = ?
         WHERE id = ?`,
        [
          enabled,
          req.params.id
        ]
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

/* DELETE */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await pool.query(
        `DELETE FROM alarms
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