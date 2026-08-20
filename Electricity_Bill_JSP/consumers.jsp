<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ include file="WEB-INF/db.jspf" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Consumers</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
<div class="nav-brand">⚡ Electricity Bill System</div>
<div class="nav-links"><a href="index.jsp">Calculate</a><a href="dashboard.jsp">Dashboard</a><a href="history.jsp">Bill History</a><a href="ebill_consumers.jsp">Consumers</a></div>
</nav>
<main class="container">
<h1>Consumers</h1>
<div class="table-wrap">
<table>
<tr><th>Consumer Number</th><th>Name</th><th>Email</th><th>Phone</th></tr>
<%
try {
 Connection con=getConnection();
 Statement st=con.createStatement();
 ResultSet rs=st.executeQuery("SELECT consumer_number,consumer_name,email,phone FROM ebill_consumers ORDER BY consumer_number");
 while(rs.next()) {
%>
<tr><td><%=rs.getString(1)%></td><td><%=rs.getString(2)%></td><td><%=rs.getString(3)==null?"-":rs.getString(3)%></td><td><%=rs.getString(4)==null?"-":rs.getString(4)%></td></tr>
<% } rs.close();st.close();con.close();
} catch(Exception e) { %><tr><td colspan="4">Database error: <%=e.getMessage()%></td></tr><% } %>
</table>
</div>
<p class="hint">Consumers are automatically created/updated when a bill is generated.</p>
</main>
</body>
</html>
