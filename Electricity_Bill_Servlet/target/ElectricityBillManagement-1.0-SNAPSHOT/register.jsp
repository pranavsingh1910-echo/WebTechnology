<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html>

<head>

    <title>Customer Registration</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="form-container">

    <h1>Customer Registration</h1>

    <form action="register" method="post">

        <label>Consumer Number</label>

        <input type="text"
               name="consumer_no"
               placeholder="Enter consumer number"
               required>


        <label>Customer Name</label>

        <input type="text"
               name="name"
               placeholder="Enter full name"
               required>


        <label>Email</label>

        <input type="email"
               name="email"
               placeholder="Enter email"
               required>


        <label>Phone</label>

        <input type="text"
               name="phone"
               placeholder="Enter phone number"
               required>


        <label>Address</label>

        <textarea name="address"
                  placeholder="Enter address"
                  required></textarea>


        <button type="submit" class="btn">
            Register Customer
        </button>

    </form>

    <p>
        <a href="index.jsp">← Back to Home</a>
    </p>

</div>

</body>
</html>