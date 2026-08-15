<%@ page import="java.sql.*" %>
<%@ page import="com.mycompany.electricity.DBConnection" %>

<!DOCTYPE html>
<html>

<head>

    <title>Bill History</title>

    <link rel="stylesheet" href="css/style.css">

</head>

<body>

<nav class="navbar">

    <div class="logo">
        ? Electricity Bill
    </div>

    <div class="nav-links">

        <a href="dashboard.jsp">Dashboard</a>
        <a href="calculate.jsp">Calculate Bill</a>
        <a href="logout">Logout</a>

    </div>

</nav>


<div class="table-container">

    <h1>Bill History</h1>

    <table>

        <tr>

            <th>ID</th>
            <th>Consumer No</th>
            <th>Units</th>
            <th>Amount</th>
            <th>Bill Date</th>
            <th>Due Date</th>
            <th>Status</th>

        </tr>

        <%
            try {

                Connection con =
                    DBConnection.getConnection();

                String sql =
                    "SELECT * FROM bills ORDER BY id DESC";

                PreparedStatement ps =
                    con.prepareStatement(sql);

                ResultSet rs =
                    ps.executeQuery();

                while (rs.next()) {
        %>

        <tr>

            <td>
                <%= rs.getInt("id") %>
            </td>

            <td>
                <%= rs.getString("consumer_no") %>
            </td>

            <td>
                <%= rs.getInt("units") %>
            </td>

            <td>
                ?<%= rs.getDouble("bill_amount") %>
            </td>

            <td>
                <%= rs.getDate("bill_date") %>
            </td>

            <td>
                <%= rs.getDate("due_date") %>
            </td>

            <td>
                <%= rs.getString("status") %>
            </td>

        </tr>

        <%
                }

                rs.close();
                ps.close();
                con.close();

            } catch (Exception e) {

                out.println(
                    "<tr><td colspan='7'>"
                    + e.getMessage()
                    + "</td></tr>"
                );
            }
        %>

    </table>

</div>

</body>
</html>