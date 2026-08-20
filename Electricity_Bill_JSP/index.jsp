<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Electricity Bill Management System</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
    <div class="nav-brand">⚡ Electricity Bill System</div>
    <div class="nav-links">
        <a href="index.jsp">Calculate</a>
        <a href="dashboard.jsp">Dashboard</a>
        <a href="history.jsp">Bill History</a>
        <a href="consumers.jsp">Consumers</a>
    </div>
</nav>

<main class="container">
    <section class="hero">
        <h1>Electricity Bill Calculator</h1>
        <p>Calculate and save monthly electricity ebill_monthly_bills.</p>
    </section>

    <section class="grid">
        <form action="result.jsp" method="post" class="card">
            <h2>New Monthly Bill</h2>

            <label>Consumer Number</label>
            <input type="text" name="consumerNumber" placeholder="e.g. EB001" required>

            <label>Consumer Name</label>
            <input type="text" name="consumerName" placeholder="Enter consumer name" required>

            <div class="two-col">
                <div>
                    <label>Month</label>
                    <select name="month" required>
                        <option value="">Select</option>
                        <option>January</option><option>February</option><option>March</option>
                        <option>April</option><option>May</option><option>June</option>
                        <option>July</option><option>August</option><option>September</option>
                        <option>October</option><option>November</option><option>December</option>
                    </select>
                </div>
                <div>
                    <label>Year</label>
                    <input type="number" name="year" value="2026" min="2000" max="2100" required>
                </div>
            </div>

            <label>Previous Meter Reading</label>
            <input type="number" name="previousReading" min="0" required>

            <label>Current Meter Reading</label>
            <input type="number" name="currentReading" min="0" required>

            <button type="submit">Calculate Bill</button>
        </form>

        <div class="card">
            <h2>Tariff Rates</h2>
            <div class="tariff-row"><span>First 50 units</span><b>₹3.50</b></div>
            <div class="tariff-row"><span>Next 100 units</span><b>₹4.00</b></div>
            <div class="tariff-row"><span>Next 100 units</span><b>₹5.20</b></div>
            <div class="tariff-row"><span>Above 250 units</span><b>₹6.50</b></div>

            <h3>Quick Links</h3>
            <a class="outline-btn" href="dashboard.jsp">View Dashboard</a>
            <a class="outline-btn" href="history.jsp">View Monthly History</a>
        </div>
    </section>
</main>
</body>
</html>
