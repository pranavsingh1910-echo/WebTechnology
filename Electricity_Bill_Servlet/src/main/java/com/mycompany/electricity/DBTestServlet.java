package com.mycompany.electricity;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

@WebServlet("/dbtest")
public class DBTestServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        try {

            Connection con = DBConnection.getConnection();

            out.println("<h1>Database Connected Successfully!</h1>");
            out.println("<p>Electricity database is working.</p>");

            con.close();

        } catch (Exception e) {

            out.println("<h1>Database Connection Failed!</h1>");
            out.println("<h3>Error:</h3>");
            out.println("<pre>");
            out.println(e.getMessage());
            out.println("</pre>");
        }
    }
}