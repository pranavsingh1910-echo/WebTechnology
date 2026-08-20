<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ include file="WEB-INF/db.jspf" %>
<%
int totalBills=0, paidBills=0, unpaidBills=0, totalUnits=0;
double totalAmount=0;
try {
    Connection con=getConnection();
    Statement st=con.createStatement();
    ResultSet rs=st.executeQuery("SELECT COUNT(*), COALESCE(SUM(units),0), COALESCE(SUM(bill_amount),0), COALESCE(SUM(status='PAID'),0), COALESCE(SUM(status='UNPAID'),0) FROM ebill_monthly_bills");
    if(rs.next()){ totalBills=rs.getInt(1); totalUnits=rs.getInt(2); totalAmount=rs.getDouble(3); paidBills=rs.getInt(4); unpaidBills=rs.getInt(5); }
    rs.close(); st.close(); con.close();
} catch(Exception e) { request.setAttribute("dbError", e.getMessage()); }
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Dashboard</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
<div class="nav-brand">⚡ Electricity Bill System</div>
<div class="nav-links"><a href="index.jsp">Calculate</a><a href="dashboard.jsp">Dashboard</a><a href="history.jsp">Bill History</a><a href="ebill_consumers.jsp">Consumers</a></div>
</nav>
<main class="container">
<h1>Dashboard</h1>
<p class="subtitle">Overview of saved electricity ebill_monthly_bills</p>
<% if(request.getAttribute("dbError") != null) { %>
<div class="warning">Database error: <%= request.getAttribute("dbError") %></div>
<% } %>
<div class="stats">
<div class="stat"><span>Total Bills</span><b><%= totalBills %></b></div>
<div class="stat"><span>Total Units</span><b><%= totalUnits %></b></div>
<div class="stat"><span>Total Amount</span><b>₹<%= String.format("%.2f", totalAmount) %></b></div>
<div class="stat"><span>Paid / Unpaid</span><b><%= paidBills %> / <%= unpaidBills %></b></div>
</div>
<div class="grid">
<div class="card">
<h2>Monthly Consumption</h2>
<%
try {
 Connection con=getConnection();
 PreparedStatement ps=con.prepareStatement("SELECT month_name, bill_year, SUM(units) units FROM ebill_monthly_bills GROUP BY bill_year, month_name ORDER BY bill_year, FIELD(month_name,'January','February','March','April','May','June','July','August','September','October','November','December')");
 ResultSet rs=ps.executeQuery();
 while(rs.next()) {
   int u=rs.getInt("units");
   int width=Math.min(100, u/5);
%>
<div class="bar-line"><span><%= rs.getString("month_name") %> <%= rs.getInt("bill_year") %></span><div class="bar"><i style="width:<%= width %>%"></i></div><b><%= u %></b></div>
<%
 }
 rs.close(); ps.close(); con.close();
} catch(Exception e) { %><p class="warning"><%= e.getMessage() %></p><% } %>
</div>
<div class="card">
<h2>Quick Actions</h2>
<a class="outline-btn" href="index.jsp">+ Generate Bill</a>
<a class="outline-btn" href="history.jsp">View All Bills</a>
<a class="outline-btn" href="ebill_consumers.jsp">Manage Consumers</a>
</div>
</div>
</main>
</body>
</html>
