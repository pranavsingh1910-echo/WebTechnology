<?php
function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: login.php");
        exit;
    }
}

function calculateBill($units) {
    $units = max(0, (float)$units);
    $bill = 0;

    if ($units <= 50) {
        $bill = $units * 3.50;
    } elseif ($units <= 150) {
        $bill = (50 * 3.50) + (($units - 50) * 4.00);
    } elseif ($units <= 250) {
        $bill = (50 * 3.50) + (100 * 4.00) + (($units - 150) * 5.20);
    } else {
        $bill = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + (($units - 250) * 6.50);
    }

    return round($bill, 2);
}

function getSlabDescription($units) {
    if ($units <= 50) return "0–50 units @ ₹3.50/unit";
    if ($units <= 150) return "First 50 @ ₹3.50 + next units @ ₹4.00";
    if ($units <= 250) return "First 150 + next units @ ₹5.20";
    return "First 250 + units above 250 @ ₹6.50";
}

function e($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
?>