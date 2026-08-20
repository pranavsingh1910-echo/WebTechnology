<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ include file="WEB-INF/db.jspf" %>
<%
String search=request.getParameter("search");
if(search==null) search="";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bill History</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
<div class="nav-brand">⚡ Electricity Bill System</div>
<div class="nav-links"><a href="index.jsp">Calculate</a><a href="dashboard.jsp">Dashboard</a><a href="history.jsp">Bill History</a><a href="ebill_consumers.jsp">Consumers</a></div>
</nav>
<main class="container">
<h1>Monthly Bill History</h1>
<form class="search" method="get">
<input type="text" name="search" value="<%= search %>" placeholder="Search consumer number or name">
<button type="submit">Search</button>
</form>
<div class="table-wrap">
<table>
<tr><th>Consumer</th><th>Name</th><th>Month</th><th>Units</th><th>Amount</th><th>Status</th><th>Action</th></tr>
<%
try {
 Connection con=getConnection();
 PreparedStatement ps=con.prepareStatement(
 "SELECT b.id,b.consumer_number,c.consumer_name,b.month_name,b.bill_year,b.units,b.bill_amount,b.status " +
 "FROM ebill_monthly_bills b JOIN ebill_consumers c ON b.consumer_number=c.consumer_number " +
 "WHERE b.consumer_number LIKE ? OR c.consumer_name LIKE ? ORDER BY b.bill_year DESC,b.id DESC");
 ps.setString(1,"%"+search+"%"); ps.setString(2,"%"+search+"%");
 ResultSet rs=ps.executeQuery();
 while(rs.next()) {
%>
<tr>
<td><%= rs.getString("consumer_number") %></td>
<td><%= rs.getString("consumer_name") %></td>
<td><%= rs.getString("month_name") %> <%= rs.getInt("bill_year") %></td>
<td><%= rs.getInt("units") %></td>
<td>₹<%= String.format("%.2f",rs.getDouble("bill_amount")) %></td>
<td><span class="badge <%= rs.getString("status").equals("PAID")?"paid":"unpaid" %>"><%= rs.getString("status") %></span></td>
<td><a href="updateStatus.jsp?id=<%=rs.getInt("id")%>">Toggle Status</a></td>
</tr>
<% } rs.close();ps.close();con.close();
} catch(Exception e) { %>
<tr><td colspan="7">Database error: <%= e.getMessage() %></td></tr>
<% } %>
</table>
</div>
</main>
</body>
</html>
