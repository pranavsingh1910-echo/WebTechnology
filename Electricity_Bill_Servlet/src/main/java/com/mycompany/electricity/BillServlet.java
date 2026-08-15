package com.mycompany.electricity;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;
import java.time.LocalDate;

@WebServlet("/calculateBill")
public class BillServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String consumerNo =
                request.getParameter("consumer_no");

        int units =
                Integer.parseInt(
                    request.getParameter("units")
                );

        double bill = 0;

        if (units <= 50) {

            bill = units * 3.50;

        } else if (units <= 150) {

            bill = (50 * 3.50)
                    + ((units - 50) * 4.00);

        } else if (units <= 250) {

            bill = (50 * 3.50)
                    + (100 * 4.00)
                    + ((units - 150) * 5.20);

        } else {

            bill = (50 * 3.50)
                    + (100 * 4.00)
                    + (100 * 5.20)
                    + ((units - 250) * 6.50);
        }

        LocalDate billDate = LocalDate.now();

        LocalDate dueDate =
                billDate.plusDays(15);

        String sql =
                "INSERT INTO bills " +
                "(consumer_no, units, bill_amount, " +
                "bill_date, due_date, status) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection con =
                 DBConnection.getConnection();

             PreparedStatement ps =
                 con.prepareStatement(sql)) {

            ps.setString(1, consumerNo);
            ps.setInt(2, units);
            ps.setDouble(3, bill);
            ps.setDate(
                4,
                Date.valueOf(billDate)
            );

            ps.setDate(
                5,
                Date.valueOf(dueDate)
            );

            ps.setString(6, "PENDING");

            ps.executeUpdate();

            response.setContentType("text/html");

            response.getWriter().println(
                "<html><body>"
            );

            response.getWriter().println(
                "<h1>Electricity Bill Generated</h1>"
            );

            response.getWriter().println(
                "<h2>Consumer Number: "
                + consumerNo + "</h2>"
            );

            response.getWriter().println(
                "<h2>Units: "
                + units + "</h2>"
            );

            response.getWriter().println(
                "<h2>Total Bill: ₹"
                + String.format("%.2f", bill)
                + "</h2>"
            );

            response.getWriter().println(
                "<p>Bill Date: "
                + billDate + "</p>"
            );

            response.getWriter().println(
                "<p>Due Date: "
                + dueDate + "</p>"
            );

            response.getWriter().println(
                "<p>Status: PENDING</p>"
            );

            response.getWriter().println(
                "<br><a href='calculate.jsp'>Calculate Another Bill</a>"
            );

            response.getWriter().println(
                "<br><a href='dashboard.jsp'>Dashboard</a>"
            );

            response.getWriter().println(
                "</body></html>"
            );

        } catch (SQLException e) {

            response.getWriter().println(
                "Database Error: "
                + e.getMessage()
            );
        }
    }
}