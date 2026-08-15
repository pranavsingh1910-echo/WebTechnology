package com.mycompany.electricity;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

@WebServlet("/register")
public class RegisterCustomerServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String consumerNo =
                request.getParameter("consumer_no");

        String name =
                request.getParameter("name");

        String email =
                request.getParameter("email");

        String phone =
                request.getParameter("phone");

        String address =
                request.getParameter("address");

        String sql =
                "INSERT INTO customers " +
                "(consumer_no, name, email, phone, address) " +
                "VALUES (?, ?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, consumerNo);
            ps.setString(2, name);
            ps.setString(3, email);
            ps.setString(4, phone);
            ps.setString(5, address);

            ps.executeUpdate();

            response.setContentType("text/html");

            response.getWriter().println(
                "<h2>Customer Registered Successfully!</h2>"
            );

            response.getWriter().println(
                "<a href='register.jsp'>Register Another</a><br>"
            );

            response.getWriter().println(
                "<a href='index.jsp'>Home</a>"
            );

        } catch (SQLException e) {

            response.setContentType("text/html");

            response.getWriter().println(
                "<h2>Registration Failed</h2>"
            );

            response.getWriter().println(
                "<p>" + e.getMessage() + "</p>"
            );
        }
    }
}