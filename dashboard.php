<?php
require_once "config.php";
require_once "functions.php";
requireLogin();

$userId = $_SESSION["user_id"];

$stmt = $pdo->prepare("SELECT COUNT(*) FROM bills WHERE user_id = ?");
$stmt->execute([$userId]);
$totalBills = (int)$stmt->fetchColumn();

$stmt = $pdo->prepare("SELECT COALESCE(SUM(amount),0) FROM bills WHERE user_id = ?");
$stmt->execute([$userId]);
$totalAmount = (float)$stmt->fetchColumn();

$stmt = $pdo->prepare("SELECT COALESCE(SUM(units),0) FROM bills WHERE user_id = ?");
$stmt->execute([$userId]);
$totalUnits = (float)$stmt->fetchColumn();

$stmt = $pdo->prepare("SELECT * FROM bills WHERE user_id = ? ORDER BY bill_month DESC LIMIT 6");
$stmt->execute([$userId]);
$bills = $stmt->fetchAll();

$currentMonth = date("Y-m");
$stmt = $pdo->prepare("SELECT * FROM bills WHERE user_id = ? AND bill_month = ?");
$stmt->execute([$userId, $currentMonth]);
$currentBill = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard | PowerBill</title>
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

<main class="container">
    <section class="hero">
        <div>
            <p class="eyebrow">MONTHLY ELECTRICITY MANAGER</p>
            <h1>Hello, <?= e($_SESSION["user_name"]) ?> 👋</h1>
            <p>Track your monthly units, calculate bills and monitor payment status.</p>
        </div>
        <a class="btn primary" href="calculate.php">+ Add Monthly Bill</a>
    </section>

    <section class="stats">
        <div class="stat-card"><span>Total Bills</span><strong><?= $totalBills ?></strong></div>
        <div class="stat-card"><span>Total Units</span><strong><?= number_format($totalUnits, 0) ?></strong></div>
        <div class="stat-card"><span>Total Amount</span><strong>₹<?= number_format($totalAmount, 2) ?></strong></div>
        <div class="stat-card"><span>This Month</span><strong><?= $currentBill ? "Added" : "Pending" ?></strong></div>
    </section>

    <section class="grid-2">
        <div class="panel">
            <div class="panel-head">
                <h2>Recent Bills</h2>
                <a href="history.php">View all</a>
            </div>
            <?php if (!$bills): ?>
                <p class="muted">No bills yet. Add your first monthly bill.</p>
            <?php else: ?>
            <div class="table-wrap">
            <table>
                <thead><tr><th>Month</th><th>Units</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                <?php foreach ($bills as $bill): ?>
                    <tr>
                        <td><?= date("F Y", strtotime($bill["bill_month"]."-01")) ?></td>
                        <td><?= e($bill["units"]) ?> kWh</td>
                        <td>₹<?= number_format($bill["amount"], 2) ?></td>
                        <td><span class="badge <?= $bill["status"] === "Paid" ? "paid" : "unpaid" ?>"><?= e($bill["status"]) ?></span></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            </div>
            <?php endif; ?>
        </div>

        <div class="panel highlight">
            <h2>Tariff Slabs</h2>
            <div class="slab"><span>0–50 units</span><b>₹3.50/unit</b></div>
            <div class="slab"><span>51–150 units</span><b>₹4.00/unit</b></div>
            <div class="slab"><span>151–250 units</span><b>₹5.20/unit</b></div>
            <div class="slab"><span>Above 250 units</span><b>₹6.50/unit</b></div>
            <a class="btn secondary full" href="calculate.php">Calculate Now</a>
        </div>
    </section>
</main>
</body>
</html>