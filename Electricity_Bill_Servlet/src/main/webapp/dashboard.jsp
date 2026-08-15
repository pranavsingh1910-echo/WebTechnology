<%@ page contentType="text/html;charset=UTF-8" %>

<%
    String username =
        (String) session.getAttribute("username");

    if (username == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>

<!DOCTYPE html>
<html>

<head>

    <title>Dashboard</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<nav class="navbar">

    <div class="logo">
        ⚡ Electricity Bill
    </div>

    <div class="nav-links">

        <a href="index.jsp">Home</a>
        <a href="calculate.jsp">Calculate Bill</a>
        <a href="customers.jsp">Customers</a>
        <a href="bills.jsp">Bills</a>
        <a href="logout">Logout</a>

    </div>

</nav>


<div class="dashboard">

    <h1>Welcome, <%= username %>!</h1>

    <div class="dashboard-grid">

        <div class="dashboard-card">
            <h2>⚡</h2>
            <h3>Calculate Bill</h3>
            <a href="calculate.jsp" class="btn">
                Calculate
            </a>
        </div>


        <div class="dashboard-card">
            <h2>👤</h2>
            <h3>Customers</h3>
            <a href="customers.jsp" class="btn">
                View Customers
            </a>
        </div>


        <div class="dashboard-card">
            <h2>🧾</h2>
            <h3>Bill History</h3>
            <a href="bills.jsp" class="btn">
                View Bills
            </a>
        </div>


        <div class="dashboard-card">
            <h2>💳</h2>
            <h3>Payments</h3>
            <p>Manage bill payments</p>
        </div>

    </div>

</div>

</body>
</html>