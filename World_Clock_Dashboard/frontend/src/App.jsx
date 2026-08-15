import React, { useEffect, useState } from "react";
import {
  Globe,
  Moon,
  Sun,
  TimerReset,
  AlarmClock,
  Settings2,
  Wifi
} from "lucide-react";

const API = "http://localhost:5000/api";

const zoneOptions = [
  ["Pune", "India", "🇮🇳", "Asia/Kolkata"],
  ["New York", "USA", "🇺🇸", "America/New_York"],
  ["London", "United Kingdom", "🇬🇧", "Europe/London"],
  ["Tokyo", "Japan", "🇯🇵", "Asia/Tokyo"],
  ["Dubai", "UAE", "🇦🇪", "Asia/Dubai"],
  ["Sydney", "Australia", "🇦🇺", "Australia/Sydney"],
  ["Singapore", "Singapore", "🇸🇬", "Asia/Singapore"],
  ["Paris", "France", "🇫🇷", "Europe/Paris"]
];

function App() {
  const [now, setNow] = useState(new Date());

  const [darkMode, setDarkMode] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [timeFormat24, setTimeFormat24] = useState(false);

  const [zones, setZones] = useState([]);
  const [alarms, setAlarms] = useState([]);

  const [selectedZone, setSelectedZone] = useState("");

  const [alarmTime, setAlarmTime] = useState("");
  const [alarmLabel, setAlarmLabel] = useState("");

  const [swRunning, setSwRunning] = useState(false);
  const [swElapsed, setSwElapsed] = useState(0);
  const [swStartedAt, setSwStartedAt] = useState(null);
  const [laps, setLaps] = useState([]);

  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("5");

  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [apiStatus, setApiStatus] = useState("Checking...");

  /* ============================= */
  /* LIVE CLOCK */
  /* ============================= */

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  /* ============================= */
  /* STOPWATCH */
  /* ============================= */

  useEffect(() => {
    const id = setInterval(() => {
      if (swRunning && swStartedAt) {
        setSwElapsed(Date.now() - swStartedAt);
      }
    }, 30);

    return () => clearInterval(id);
  }, [swRunning, swStartedAt]);

  /* ============================= */
  /* COUNTDOWN TIMER */
  /* ============================= */

  useEffect(() => {
    const id = setInterval(() => {
      setTimerSeconds((value) => {
        if (timerRunning && value > 0) {
          return value - 1;
        }

        return value;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      alert("⏳ Timer finished!");
    }
  }, [timerSeconds, timerRunning]);

  /* ============================= */
  /* LOAD DATABASE DATA */
  /* ============================= */

  useEffect(() => {
    Promise.all([
      fetch(`${API}/health`).then((r) => r.json()),
      fetch(`${API}/timezones?user_id=1`).then((r) => r.json()),
      fetch(`${API}/alarms?user_id=1`).then((r) => r.json()),
      fetch(`${API}/events?user_id=1`).then((r) => r.json())
    ])
      .then(([health, timezoneData, alarmData, eventData]) => {
        setApiStatus(
          health.success
            ? "Connected"
            : "Database error"
        );

        setZones(
          Array.isArray(timezoneData)
            ? timezoneData
            : []
        );

        setAlarms(
          Array.isArray(alarmData)
            ? alarmData
            : []
        );

        setEvents(
          Array.isArray(eventData)
            ? eventData
            : []
        );
      })
      .catch(() => {
        setApiStatus("Backend offline");
      });
  }, []);

  /* ============================= */
  /* HELPERS */
  /* ============================= */

  const pad = (number) => {
    return String(number).padStart(2, "0");
  };

  /* ============================= */
  /* DIGITAL CLOCK */
  /* ============================= */

  const formatMainTime = () => {
    let hours = now.getHours();

    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!timeFormat24) {
      const period = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      return (
        `${pad(hours)}:${pad(minutes)}` +
        `${showSeconds ? `:${pad(seconds)}` : ""} ` +
        period
      );
    }

    return (
      `${pad(hours)}:${pad(minutes)}` +
      `${showSeconds ? `:${pad(seconds)}` : ""}`
    );
  };

  /* ============================= */
  /* ANALOG CLOCK */
  /* ============================= */

  const analogAngles = {
    h:
      (now.getHours() % 12) * 30 +
      now.getMinutes() * 0.5,

    m:
      now.getMinutes() * 6 +
      now.getSeconds() * 0.1,

    s:
      now.getSeconds() * 6
  };

  /* ============================= */
  /* WORLD TIME */
  /* ============================= */

  const getZoneTime = (zone) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !timeFormat24
    }).format(now);
  };

  /* ============================= */
  /* ADD TIMEZONE */
  /* ============================= */

  const addZone = async () => {
    if (!selectedZone) {
      return;
    }

    const [
      city,
      country,
      flag,
      timezone
    ] = JSON.parse(selectedZone);

    if (
      zones.some(
        (zone) => zone.timezone === timezone
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/timezones`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: 1,
            city,
            country,
            flag,
            timezone
          })
        }
      );

      const created = await response.json();

      setZones((value) => [
        ...value,
        created
      ]);

      setSelectedZone("");

    } catch {
      alert("Backend is not running.");
    }
  };

  /* ============================= */
  /* REMOVE TIMEZONE */
  /* ============================= */

  const removeZone = async (id) => {
    await fetch(
      `${API}/timezones/${id}`,
      {
        method: "DELETE"
      }
    );

    setZones((value) =>
      value.filter(
        (zone) => zone.id !== id
      )
    );
  };

  /* ============================= */
  /* ADD ALARM */
  /* ============================= */

  const addAlarm = async () => {
    if (!alarmTime) {
      return;
    }

    const response = await fetch(
      `${API}/alarms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          alarm_time: alarmTime,
          label: alarmLabel || "Alarm",
          enabled: true
        })
      }
    );

    const alarm = await response.json();

    setAlarms((value) => [
      ...value,
      alarm
    ]);

    setAlarmTime("");
    setAlarmLabel("");
  };

  /* ============================= */
  /* TOGGLE ALARM */
  /* ============================= */

  const toggleAlarm = async (alarm) => {
    await fetch(
      `${API}/alarms/${alarm.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          enabled: !alarm.enabled
        })
      }
    );

    setAlarms((value) =>
      value.map((item) =>
        item.id === alarm.id
          ? {
              ...item,
              enabled: !item.enabled
            }
          : item
      )
    );
  };

  /* ============================= */
  /* DELETE ALARM */
  /* ============================= */

  const deleteAlarm = async (id) => {
    await fetch(
      `${API}/alarms/${id}`,
      {
        method: "DELETE"
      }
    );

    setAlarms((value) =>
      value.filter(
        (alarm) => alarm.id !== id
      )
    );
  };

  /* ============================= */
  /* START / PAUSE STOPWATCH */
  /* ============================= */

  const startStopwatch = () => {
    if (swRunning) {
      setSwElapsed(
        Date.now() - swStartedAt
      );

      setSwRunning(false);

    } else {
      setSwStartedAt(
        Date.now() - swElapsed
      );

      setSwRunning(true);
    }
  };

  /* ============================= */
  /* RESET STOPWATCH */
  /* ============================= */

  const resetStopwatch = () => {
    setSwRunning(false);
    setSwElapsed(0);
    setSwStartedAt(null);
    setLaps([]);
  };

  /* ============================= */
  /* LAP */
  /* ============================= */

  const addLap = () => {
    if (!swRunning) {
      return;
    }

    setLaps((value) => [
      ...value,
      swElapsed
    ]);
  };

  /* ============================= */
  /* FORMAT STOPWATCH */
  /* ============================= */

  const formatDuration = (milliseconds) => {
    const totalSeconds =
      Math.floor(milliseconds / 1000);

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    const centiseconds =
      Math.floor(
        (milliseconds % 1000) / 10
      );

    return (
      `${pad(minutes)}:` +
      `${pad(seconds)}.` +
      `${pad(centiseconds)}`
    );
  };

  /* ============================= */
  /* TIMER */
  /* ============================= */

  const formatTimer = (seconds) => {
    return (
      `${pad(Math.floor(seconds / 60))}:` +
      `${pad(seconds % 60)}`
    );
  };

  const setPreset = (minutes) => {
    setTimerSeconds(minutes * 60);
    setTimerRunning(false);
  };

  /* ============================= */
  /* ADD EVENT */
  /* ============================= */

  const addEvent = async () => {
    if (!eventTitle || !eventDate) {
      return;
    }

    const response = await fetch(
      `${API}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          title: eventTitle,
          event_date: eventDate
        })
      }
    );

    const event = await response.json();

    setEvents((value) => [
      ...value,
      event
    ]);

    setEventTitle("");
    setEventDate("");
  };

  /* ============================= */
  /* DELETE EVENT */
  /* ============================= */

  const deleteEvent = async (id) => {
    await fetch(
      `${API}/events/${id}`,
      {
        method: "DELETE"
      }
    );

    setEvents((value) =>
      value.filter(
        (event) => event.id !== id
      )
    );
  };

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app light"
      }
    >

      {/* HEADER */}

      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            <Globe size={28} />
          </div>

          <div>
            <h1>
              World Clock Dashboard
            </h1>

            <p>
              Real-time time management system
            </p>
          </div>

        </div>

        <div className="header-actions">

          <span
            className={
              apiStatus === "Connected"
                ? "status ok"
                : "status"
            }
          >
            <Wifi size={14} />

            {apiStatus}
          </span>

          <button
            className="icon-btn"
            onClick={() =>
              setDarkMode(
                (value) => !value
              )
            }
          >
            {darkMode
              ? <Sun size={19} />
              : <Moon size={19} />
            }
          </button>

        </div>

      </header>

      <main className="dashboard">

        {/* MAIN CLOCK */}

        <section className="hero">

          <div className="live-label">
            <span className="dot" />
            LIVE LOCAL TIME
          </div>

          <div className="clock-face">

            {[...Array(12)].map(
              (_, index) => {

                const angle =
                  (index + 1) * 30;

                return (
                  <span
                    key={index}
                    className="clock-number"
                    style={{
                      transform:
                        `rotate(${angle}deg) ` +
                        `translateY(-105px) ` +
                        `rotate(-${angle}deg)`
                    }}
                  >
                    {index + 1}
                  </span>
                );
              }
            )}

            <div
              className="hand hour"
              style={{
                transform:
                  `rotate(${analogAngles.h}deg)`
              }}
            />

            <div
              className="hand minute"
              style={{
                transform:
                  `rotate(${analogAngles.m}deg)`
              }}
            />

            <div
              className="hand second"
              style={{
                transform:
                  `rotate(${analogAngles.s}deg)`
              }}
            />

            <div className="center-dot" />

          </div>

          <div className="main-time">
            {formatMainTime()}
          </div>

          <div className="main-date">

            {now.toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              }
            )}

          </div>

          <div className="muted">
            Asia/Kolkata • India Standard Time
          </div>

        </section>

        {/* DASHBOARD GRID */}

        <section className="grid">

          {/* WORLD CLOCK */}

          <div className="panel wide">

            <div className="panel-head">

              <div>
                <h2>
                  🌍 World Time Zones
                </h2>

                <p>
                  Live time across selected cities
                </p>
              </div>

              <span className="badge">
                {zones.length}
              </span>

            </div>

            <div className="add-row">

              <select
                value={selectedZone}
                onChange={(event) =>
                  setSelectedZone(
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select a city
                </option>

                {zoneOptions.map(
                  (zone) => (
                    <option
                      key={zone[3]}
                      value={JSON.stringify(zone)}
                    >
                      {zone[0]} - {zone[1]}
                    </option>
                  )
                )}

              </select>

              <button onClick={addZone}>
                ＋ Add
              </button>

            </div>

            <div className="zone-list">

              {zones.map((zone) => (

                <div
                  className="zone-card"
                  key={zone.id}
                >

                  <span className="flag">
                    {zone.flag}
                  </span>

                  <div className="zone-info">

                    <strong>
                      {zone.city}
                    </strong>

                    <small>
                      {zone.country}
                    </small>

                  </div>

                  <strong className="zone-time">
                    {getZoneTime(
                      zone.timezone
                    )}
                  </strong>

                  <button
                    className="danger"
                    onClick={() =>
                      removeZone(zone.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* ALARMS */}

          <div className="panel">

            <div className="panel-head">

              <div>
                <h2>
                  ⏰ Alarms
                </h2>

                <p>
                  Saved in MySQL
                </p>
              </div>

              <AlarmClock size={20} />

            </div>

            <div className="form">

              <input
                type="time"
                value={alarmTime}
                onChange={(event) =>
                  setAlarmTime(
                    event.target.value
                  )
                }
              />

              <input
                placeholder="Alarm label"
                value={alarmLabel}
                onChange={(event) =>
                  setAlarmLabel(
                    event.target.value
                  )
                }
              />

              <button onClick={addAlarm}>
                ＋ Add Alarm
              </button>

            </div>

            {alarms.map((alarm) => (

              <div
                className="list-row"
                key={alarm.id}
              >

                <div>

                  <strong>
                    {String(
                      alarm.alarm_time
                    ).slice(0, 5)}
                  </strong>

                  <small>
                    {alarm.label}
                  </small>

                </div>

                <div className="row-actions">

                  <button
                    className={
                      alarm.enabled
                        ? "switch on"
                        : "switch"
                    }
                    onClick={() =>
                      toggleAlarm(alarm)
                    }
                  >
                    <i />
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      deleteAlarm(alarm.id)
                    }
                  >
                    🗑
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* STOPWATCH */}

          <div className="panel">

            <div className="panel-head">

              <div>

                <h2>
                  ⏱️ Stopwatch
                </h2>

                <p>
                  Precision timing with laps
                </p>

              </div>

              <TimerReset size={20} />

            </div>

            <div className="big-timer">
              {formatDuration(swElapsed)}
            </div>

            <div className="button-row">

              <button
                onClick={startStopwatch}
              >
                {swRunning
                  ? "Pause"
                  : "Start"
                }
              </button>

              <button
                onClick={addLap}
                disabled={!swRunning}
              >
                Lap
              </button>

              <button
                onClick={resetStopwatch}
              >
                Reset
              </button>

            </div>

            <div className="laps">

              {laps.map(
                (lap, index) => (

                  <div key={index}>

                    <span>
                      Lap {index + 1}
                    </span>

                    <strong>
                      {formatDuration(lap)}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

          {/* COUNTDOWN TIMER */}

          <div className="panel">

            <div className="panel-head">

              <div>

                <h2>
                  ⏳ Countdown Timer
                </h2>

                <p>
                  Quick focus timer
                </p>

              </div>

              <span>
                ⏳
              </span>

            </div>

            <div className="big-timer">
              {formatTimer(timerSeconds)}
            </div>

            <div className="form inline">

              <input
                type="number"
                min="1"
                value={timerInput}
                onChange={(event) =>
                  setTimerInput(
                    event.target.value
                  )
                }
              />

              <button
                onClick={() =>
                  setPreset(
                    Number(timerInput) || 1
                  )
                }
              >
                Set Min
              </button>

            </div>

            <div className="preset-row">

              {[5, 10, 15, 30].map(
                (minutes) => (

                  <button
                    key={minutes}
                    onClick={() =>
                      setPreset(minutes)
                    }
                  >
                    {minutes}m
                  </button>

                )
              )}

            </div>

            <div className="button-row">

              <button
                onClick={() =>
                  setTimerRunning(
                    (value) => !value
                  )
                }
              >
                {timerRunning
                  ? "Pause"
                  : "Start"
                }
              </button>

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(0);
                }}
              >
                Reset
              </button>

            </div>

          </div>

          {/* EVENTS */}

          <div className="panel">

            <div className="panel-head">

              <div>

                <h2>
                  📅 Events
                </h2>

                <p>
                  Calendar reminders
                </p>

              </div>

              <span>
                📌
              </span>

            </div>

            <div className="form">

              <input
                placeholder="Event title"
                value={eventTitle}
                onChange={(event) =>
                  setEventTitle(
                    event.target.value
                  )
                }
              />

              <input
                type="date"
                value={eventDate}
                onChange={(event) =>
                  setEventDate(
                    event.target.value
                  )
                }
              />

              <button onClick={addEvent}>
                ＋ Add Event
              </button>

            </div>

            {events.slice(-5).map(
              (event) => (

                <div
                  className="list-row"
                  key={event.id}
                >

                  <div>

                    <strong>
                      {event.title}
                    </strong>

                    <small>
                      {event.event_date}
                    </small>

                  </div>

                  <button
                    className="danger"
                    onClick={() =>
                      deleteEvent(event.id)
                    }
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

          {/* SETTINGS */}

          <div className="panel">

            <div className="panel-head">

              <div>

                <h2>
                  ⚙️ Settings
                </h2>

                <p>
                  Dynamic dashboard controls
                </p>

              </div>

              <Settings2 size={20} />

            </div>

            <label className="setting">

              <span>
                Dark Mode
              </span>

              <button
                className={
                  darkMode
                    ? "switch on"
                    : "switch"
                }
                onClick={() =>
                  setDarkMode(
                    (value) => !value
                  )
                }
              >
                <i />
              </button>

            </label>

            <label className="setting">

              <span>
                Show Seconds
              </span>

              <button
                className={
                  showSeconds
                    ? "switch on"
                    : "switch"
                }
                onClick={() =>
                  setShowSeconds(
                    (value) => !value
                  )
                }
              >
                <i />
              </button>

            </label>

            <label className="setting">

              <span>
                24-hour Format
              </span>

              <button
                className={
                  timeFormat24
                    ? "switch on"
                    : "switch"
                }
                onClick={() =>
                  setTimeFormat24(
                    (value) => !value
                  )
                }
              >
                <i />
              </button>

            </label>

          </div>

        </section>

      </main>

      <footer>
        World Clock Dashboard • React + Node.js + MySQL
      </footer>

    </div>
  );
}

export default App;