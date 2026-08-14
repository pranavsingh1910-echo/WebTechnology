<?php
require_once "config.php";
require_once "functions.php";
requireLogin();

$userId = $_SESSION["user_id"];
$filter = trim($_GET["month"] ?? "");

if ($filter !== "" && preg_match('/^\d{4}-\d{2}$/', $filter)) {
    $stmt = $pdo->prepare("SELECT * FROM bills WHERE user_id = ? AND bill_month = ? ORDER BY bill_month DESC");
    $stmt->execute([$userId, $filter]);
} else {
    $stmt = $pdo->prepare("SELECT * FROM bills WHERE user_id = ? ORDER BY bill_month DESC");
    $stmt->execute([$userId]);
}
$bills = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bill History | PowerBill</title>
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
    <div class="page-title">
        <p class="eyebrow">MONTHLY RECORDS</p>
        <h1>Bill History</h1>
        <p>View your electricity usage and payment status month by month.</p>
    </div>

    <div class="panel">
        <form class="filter-form" method="get">
            <div>
                <label>Filter by Month</label>
                <input type="month" name="month" value="<?= e($filter) ?>">
            </div>
            <button class="btn secondary" type="submit">Filter</button>
            <a class="btn ghost" href="history.php">Clear</a>
        </form>
    </div>

    <div class="panel">
        <div class="table-wrap">
        <table>
            <thead><tr><th>Month</th><th>Units</th><th>Rate Slab</th><th>Bill Amount</th><th>Status</th></tr></thead>
            <tbody>
            <?php if (!$bills): ?>
                <tr><td colspan="5" class="center muted">No records found.</td></tr>
            <?php else: foreach ($bills as $bill): ?>
                <tr>
                    <td><?= date("F Y", strtotime($bill["bill_month"]."-01")) ?></td>
                    <td><?= e($bill["units"]) ?> kWh</td>
                    <td><?= e(getSlabDescription($bill["units"])) ?></td>
                    <td><strong>₹<?= number_format($bill["amount"], 2) ?></strong></td>
                    <td><span class="badge <?= $bill["status"] === "Paid" ? "paid" : "unpaid" ?>"><?= e($bill["status"]) ?></span></td>
                </tr>
            <?php endforeach; endif; ?>
            </tbody>
        </table>
        </div>
    </div>
</main>
</body>
</html>