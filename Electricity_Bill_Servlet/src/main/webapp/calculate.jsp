<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html>

<head>

    <title>Calculate Electricity Bill</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<nav class="navbar">

    <div class="logo">
        ⚡ Electricity Bill
    </div>

    <div class="nav-links">

        <a href="index.jsp">Home</a>
        <a href="dashboard.jsp">Dashboard</a>
        <a href="logout">Logout</a>

    </div>

</nav>


<div class="form-container">

    <h1>Calculate Electricity Bill</h1>

    <form action="calculateBill" method="post">

        <label>Consumer Number</label>

        <input type="text"
               name="consumer_no"
               placeholder="Enter consumer number"
               required>


        <label>Units Consumed</label>

        <input type="number"
               name="units"
               min="0"
               placeholder="Enter units"
               required>


        <button type="submit" class="btn">
            Calculate Bill
        </button>

    </form>


    <div class="slabs">

        <h3>Electricity Rate Slabs</h3>

        <p>First 50 units: ₹3.50/unit</p>

        <p>Next 100 units: ₹4.00/unit</p>

        <p>Next 100 units: ₹5.20/unit</p>

        <p>Above 250 units: ₹6.50/unit</p>

    </div>

</div>

</body>
</html>