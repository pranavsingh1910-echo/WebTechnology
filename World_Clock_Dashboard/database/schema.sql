CREATE DATABASE IF NOT EXISTS world_clock_db;

USE world_clock_db;


/* ========================= */
/* USERS */
/* ========================= */

CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255),

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


/* DEMO USER */

INSERT INTO users
(
    id,
    name,
    email
)

VALUES
(
    1,
    'Demo User',
    'demo@example.com'
)

ON DUPLICATE KEY UPDATE
    name = VALUES(name);


/* ========================= */
/* TIMEZONES */
/* ========================= */

CREATE TABLE IF NOT EXISTS timezones (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    city VARCHAR(100) NOT NULL,

    country VARCHAR(100) NOT NULL,

    flag VARCHAR(10)
        DEFAULT '🌍',

    timezone VARCHAR(100) NOT NULL,

    is_favorite BOOLEAN
        DEFAULT TRUE,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* ALARMS */
/* ========================= */

CREATE TABLE IF NOT EXISTS alarms (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    alarm_time TIME NOT NULL,

    label VARCHAR(100)
        DEFAULT 'Alarm',

    enabled BOOLEAN
        DEFAULT TRUE,

    repeat_type VARCHAR(30)
        DEFAULT 'once',

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* STOPWATCH SESSIONS */
/* ========================= */

CREATE TABLE IF NOT EXISTS stopwatch_sessions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    start_time DATETIME,

    end_time DATETIME,

    duration_ms BIGINT
        DEFAULT 0,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* STOPWATCH LAPS */
/* ========================= */

CREATE TABLE IF NOT EXISTS stopwatch_laps (

    id INT AUTO_INCREMENT PRIMARY KEY,

    session_id INT NOT NULL,

    lap_number INT NOT NULL,

    lap_time_ms BIGINT NOT NULL,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (session_id)
        REFERENCES stopwatch_sessions(id)
        ON DELETE CASCADE

);


/* ========================= */
/* TIMERS */
/* ========================= */

CREATE TABLE IF NOT EXISTS timers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    duration_seconds INT NOT NULL,

    label VARCHAR(100)
        DEFAULT 'Timer',

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* EVENTS */
/* ========================= */

CREATE TABLE IF NOT EXISTS events (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,

    description TEXT,

    event_date DATE NOT NULL,

    event_time TIME,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* SETTINGS */
/* ========================= */

CREATE TABLE IF NOT EXISTS settings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    theme VARCHAR(20)
        DEFAULT 'dark',

    time_format VARCHAR(10)
        DEFAULT '12',

    show_seconds BOOLEAN
        DEFAULT TRUE,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


/* ========================= */
/* DEFAULT TIMEZONES */
/* ========================= */

INSERT INTO timezones
(
    user_id,
    city,
    country,
    flag,
    timezone
)

SELECT
    1,
    'Pune',
    'India',
    '🇮🇳',
    'Asia/Kolkata'

WHERE NOT EXISTS
(
    SELECT 1
    FROM timezones
    WHERE user_id = 1
    AND timezone = 'Asia/Kolkata'
);


INSERT INTO timezones
(
    user_id,
    city,
    country,
    flag,
    timezone
)

SELECT
    1,
    'New York',
    'USA',
    '🇺🇸',
    'America/New_York'

WHERE NOT EXISTS
(
    SELECT 1
    FROM timezones
    WHERE user_id = 1
    AND timezone = 'America/New_York'
);


INSERT INTO timezones
(
    user_id,
    city,
    country,
    flag,
    timezone
)

SELECT
    1,
    'London',
    'United Kingdom',
    '🇬🇧',
    'Europe/London'

WHERE NOT EXISTS
(
    SELECT 1
    FROM timezones
    WHERE user_id = 1
    AND timezone = 'Europe/London'
);


INSERT INTO timezones
(
    user_id,
    city,
    country,
    flag,
    timezone
)

SELECT
    1,
    'Tokyo',
    'Japan',
    '🇯🇵',
    'Asia/Tokyo'

WHERE NOT EXISTS
(
    SELECT 1
    FROM timezones
    WHERE user_id = 1
    AND timezone = 'Asia/Tokyo'
);


/* ========================= */
/* DEFAULT SETTINGS */
/* ========================= */

INSERT INTO settings
(
    user_id
)

VALUES
(
    1
)

ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);