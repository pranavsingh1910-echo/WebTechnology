<%@ page import="java.sql.*" %>
<%@ page import="com.mycompany.electricity.DBConnection" %>

<!DOCTYPE html>
<html>

<head>

    <title>Customers</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<nav class="navbar">

    <div class="logo">
        ? Electricity Bill
    </div>

    <div class="nav-links">

        <a href="dashboard.jsp">Dashboard</a>
        <a href="register.jsp">Add Customer</a>
        <a href="logout">Logout</a>

    </div>

</nav>


<div class="table-container">

    <h1>Customers</h1>

    <table>

        <tr>

            <th>ID</th>
            <th>Consumer No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>

        </tr>

        <%
            try {

                Connection con =
                    DBConnection.getConnection();

                String sql =
                    "SELECT * FROM customers";

                PreparedStatement ps =
                    con.prepareStatement(sql);

                ResultSet rs =
                    ps.executeQuery();

                while (rs.next()) {
        %>

        <tr>

            <td><%= rs.getInt("id") %></td>

            <td>
                <%= rs.getString("consumer_no") %>
            </td>

            <td>
                <%= rs.getString("name") %>
            </td>

            <td>
                <%= rs.getString("email") %>
            </td>

            <td>
                <%= rs.getString("phone") %>
            </td>

            <td>
                <%= rs.getString("address") %>
            </td>

        </tr>

        <%
                }

                rs.close();
                ps.close();
                con.close();

            } catch (Exception e) {

                out.println(
                    "<tr><td colspan='6'>"
                    + e.getMessage()
                    + "</td></tr>"
                );
            }
        %>

    </table>

</div>

</body>
</html>