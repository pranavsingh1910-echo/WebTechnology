<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="WEB-INF/db.jspf" %>
<%
String consumerNumber = request.getParameter("consumerNumber");
String consumerName = request.getParameter("consumerName");
String month = request.getParameter("month");
int year = Integer.parseInt(request.getParameter("year"));
int previousReading = Integer.parseInt(request.getParameter("previousReading"));
int currentReading = Integer.parseInt(request.getParameter("currentReading"));

int units = currentReading - previousReading;
double bill = 0;
String error = null;

if (units < 0) {
    error = "Current meter reading cannot be less than previous meter reading.";
} else if (units <= 50) {
    bill = units * 3.50;
} else if (units <= 150) {
    bill = (50 * 3.50) + ((units - 50) * 4.00);
} else if (units <= 250) {
    bill = (50 * 3.50) + (100 * 4.00) + ((units - 150) * 5.20);
} else {
    bill = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + ((units - 250) * 6.50);
}

boolean saved = false;
String message = "";

if (error == null && "POST".equalsIgnoreCase(request.getMethod())) {
    try {
        Connection con = getConnection();

        PreparedStatement cp = con.prepareStatement(
            "INSERT INTO ebill_consumers(consumer_number, consumer_name) VALUES(?, ?) " +
            "ON DUPLICATE KEY UPDATE consumer_name=VALUES(consumer_name)"
        );
        cp.setString(1, consumerNumber);
        cp.setString(2, consumerName);
        cp.executeUpdate();
        cp.close();

        PreparedStatement bp = con.prepareStatement(
            "INSERT INTO ebill_monthly_bills(consumer_number, month_name, bill_year, previous_reading, current_reading, units, bill_amount, status) " +
            "VALUES(?,?,?,?,?,?,?, 'UNPAID')"
        );
        bp.setString(1, consumerNumber);
        bp.setString(2, month);
        bp.setInt(3, year);
        bp.setInt(4, previousReading);
        bp.setInt(5, currentReading);
        bp.setInt(6, units);
        bp.setDouble(7, bill);
        bp.executeUpdate();
        bp.close();
        con.close();

        saved = true;
        message = "Bill saved successfully.";
    } catch(Exception e) {
        message = "Bill calculated, but database save failed: " + e.getMessage();
    }
}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bill Result</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
    <div class="nav-brand">⚡ Electricity Bill System</div>
    <div class="nav-links">
        <a href="index.jsp">Calculate</a>
        <a href="dashboard.jsp">Dashboard</a>
        <a href="history.jsp">Bill History</a>
        <a href="ebill_consumers.jsp">Consumers</a>
    </div>
</nav>

<main class="container narrow">
<% if (error != null) { %>
    <div class="card error">
        <h2>Invalid Reading</h2>
        <p><%= error %></p>
        <a class="outline-btn" href="index.jsp">Go Back</a>
    </div>
<% } else { %>
    <div class="card bill-card">
        <div class="bill-header">
            <div><span class="small">ELECTRICITY BILL</span><h1>₹<%= String.format("%.2f", bill) %></h1></div>
            <span class="badge unpaid">UNPAID</span>
        </div>
        <hr>
        <div class="details">
            <p><span>Consumer Number</span><b><%= consumerNumber %></b></p>
            <p><span>Consumer Name</span><b><%= consumerName %></b></p>
            <p><span>Billing Period</span><b><%= month %> <%= year %></b></p>
            <p><span>Previous Reading</span><b><%= previousReading %></b></p>
            <p><span>Current Reading</span><b><%= currentReading %></b></p>
            <p><span>Units Consumed</span><b><%= units %></b></p>
        </div>
        <div class="total">Total Amount <strong>₹<%= String.format("%.2f", bill) %></strong></div>
        <% if (saved) { %><div class="success"><%= message %></div><% } else { %><div class="warning"><%= message %></div><% } %>
        <div class="actions">
            <button onclick="window.print()">🖨 Print Bill</button>
            <a class="outline-btn" href="index.jsp">New Bill</a>
            <a class="outline-btn" href="history.jsp">History</a>
        </div>
    </div>
<% } %>
</main>
</body>
</html>
