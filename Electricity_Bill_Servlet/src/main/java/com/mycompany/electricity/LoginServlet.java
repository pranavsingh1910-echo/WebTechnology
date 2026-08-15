package com.mycompany.electricity;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        String sql =
                "SELECT * FROM users WHERE username=? AND password=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                HttpSession session = request.getSession();

                session.setAttribute(
                        "username",
                        rs.getString("username")
                );

                session.setAttribute(
                        "role",
                        rs.getString("role")
                );

                response.sendRedirect("dashboard.jsp");

            } else {

                response.setContentType("text/html");

                response.getWriter().println(
                    "<h2>Invalid username or password!</h2>"
                );

                response.getWriter().println(
                    "<a href='login.jsp'>Try Again</a>"
                );
            }

        } catch (SQLException e) {

            e.printStackTrace();

            response.getWriter().println(
                "Database error: " + e.getMessage()
            );
        }
    }
}