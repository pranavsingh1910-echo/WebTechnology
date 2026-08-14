<?php
require_once "config.php";
require_once "functions.php";
requireLogin();

$userId = $_SESSION["user_id"];
$error = "";
$result = null;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $month = $_POST["bill_month"] ?? "";
    $units = (float)($_POST["units"] ?? 0);
    $status = ($_POST["status"] ?? "Unpaid") === "Paid" ? "Paid" : "Unpaid";

    if (!preg_match('/^\d{4}-\d{2}$/', $month)) {
        $error = "Please select a valid month.";
    } elseif ($units < 0) {
        $error = "Units cannot be negative.";
    } else {
        $amount = calculateBill($units);

        $check = $pdo->prepare("SELECT id FROM bills WHERE user_id = ? AND bill_month = ?");
        $check->execute([$userId, $month]);

        if ($check->fetch()) {
            $stmt = $pdo->prepare("UPDATE bills SET units = ?, amount = ?, status = ? WHERE user_id = ? AND bill_month = ?");
            $stmt->execute([$units, $amount, $status, $userId, $month]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO bills (user_id, bill_month, units, amount, status) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$userId, $month, $units, $amount, $status]);
        }

        $result = [
            "month" => $month,
            "units" => $units,
            "amount" => $amount,
            "status" => $status,
            "slab" => getSlabDescription($units)
        ];
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Calculate Bill | PowerBill</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="topbar">
    <div class="brand">⚡ PowerBill</div>
    <nav>
        <a href="dashboard.php">Dashboard</a>
        <a href="calculate.php">Calculate Bill</a>
        <a href="history.php">History</a>
        <a class="logout" href="logout.php">Logout</a>
    </nav>
</header>

<main class="container narrow">
    <div class="page-title">
        <p class="eyebrow">MONTHLY BILL</p>
        <h1>Calculate Electricity Bill</h1>
        <p>Enter your monthly electricity consumption.</p>
    </div>

    <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

    <div class="panel">
        <form method="post" id="billForm">
            <div class="form-grid">
                <div>
                    <label>Billing Month</label>
                    <input type="month" name="bill_month" value="<?= e($_POST["bill_month"] ?? date("Y-m")) ?>" required>
                </div>
                <div>
                    <label>Units Consumed (kWh)</label>
                    <input type="number" name="units" id="units" min="0" step="0.01" value="<?= e($_POST["units"] ?? "") ?>" placeholder="e.g. 180" required>
                </div>
                <div>
                    <label>Payment Status</label>
                    <select name="status">
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid" <?= (($_POST["status"] ?? "") === "Paid") ? "selected" : "" ?>>Paid</option>
                    </select>
                </div>
            </div>

            <div class="live-box">
                <span>Estimated Bill</span>
                <strong id="liveAmount">₹0.00</strong>
                <small id="liveText">Enter units to preview the amount.</small>
            </div>

            <button class="btn primary full" type="submit">Calculate & Save Bill</button>
        </form>
    </div>

    <?php if ($result): ?>
    <div class="result-card">
        <div>
            <p class="eyebrow">BILL SAVED</p>
            <h2><?= date("F Y", strtotime($result["month"]."-01")) ?></h2>
            <p><?= e($result["units"]) ?> units • <?= e($result["slab"]) ?></p>
        </div>
        <div class="result-amount">₹<?= number_format($result["amount"], 2) ?></div>
        <span class="badge <?= $result["status"] === "Paid" ? "paid" : "unpaid" ?>"><?= e($result["status"]) ?></span>
    </div>
    <?php endif; ?>

    <div class="panel">
        <h2>How the bill is calculated</h2>
        <div class="formula">Bill = slab 1 + slab 2 + slab 3 + slab 4</div>
        <ul class="simple-list">
            <li>First 50 units × ₹3.50</li>
            <li>Next 100 units × ₹4.00</li>
            <li>Next 100 units × ₹5.20</li>
            <li>Units above 250 × ₹6.50</li>
        </ul>
    </div>
</main>

<script>
function calculate(units) {
    units = parseFloat(units) || 0;
    let bill = 0;
    if (units <= 50) bill = units * 3.50;
    else if (units <= 150) bill = 50 * 3.50 + (units - 50) * 4.00;
    else if (units <= 250) bill = 50 * 3.50 + 100 * 4.00 + (units - 150) * 5.20;
    else bill = 50 * 3.50 + 100 * 4.00 + 100 * 5.20 + (units - 250) * 6.50;
    return bill;
}
const unitsInput = document.getElementById("units");
const amount = document.getElementById("liveAmount");
const text = document.getElementById("liveText");
function updatePreview() {
    const units = parseFloat(unitsInput.value) || 0;
    amount.textContent = "₹" + calculate(units).toFixed(2);
    text.textContent = units ? units + " units consumed this month" : "Enter units to preview the amount.";
}
unitsInput.addEventListener("input", updatePreview);
updatePreview();
</script>
</body>
</html>