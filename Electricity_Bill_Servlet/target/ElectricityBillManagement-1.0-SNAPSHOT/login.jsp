<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html>
<head>

    <title>Login</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="form-container">

    <h1>Login</h1>

    <p>Login to Electricity Bill Management System</p>

    <form action="login" method="post">

        <label>Username</label>

        <input type="text"
               name="username"
               placeholder="Enter username"
               required>

        <label>Password</label>

        <input type="password"
               name="password"
               placeholder="Enter password"
               required>

        <button type="submit" class="btn">
            Login
        </button>

    </form>

    <p>
        New customer?
        <a href="register.jsp">Register here</a>
    </p>

    <p>
        <a href="index.jsp">← Back to Home</a>
    </p>

</div>

</body>
</html>