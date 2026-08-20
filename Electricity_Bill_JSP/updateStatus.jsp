<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ include file="WEB-INF/db.jspf" %>
<%
int id=Integer.parseInt(request.getParameter("id"));
try {
 Connection con=getConnection();
 PreparedStatement ps=con.prepareStatement("UPDATE ebill_monthly_bills SET status=CASE WHEN status='PAID' THEN 'UNPAID' ELSE 'PAID' END WHERE id=?");
 ps.setInt(1,id); ps.executeUpdate(); ps.close(); con.close();
} catch(Exception e) {}
response.sendRedirect("history.jsp");
%>
