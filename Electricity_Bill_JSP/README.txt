ELECTRICITY BILL MANAGEMENT SYSTEM - JSP + MYSQL

1. Requirements
- JDK 21
- Apache Tomcat 10.1
- MySQL Server
- MySQL Workbench
- MySQL Connector/J

2. Database
Open MySQL Workbench and run:
sql/ebill_management_2026.sql

3. MySQL password
Open:
WEB-INF/db.jspf

Change:
String password = "YOUR_MYSQL_PASSWORD";
to your actual MySQL root password.

4. MySQL Connector/J
Download MySQL Connector/J and put the JAR file in:
WEB-INF/lib/

Create the lib folder if it does not exist.

5. Run
Copy the ElectricityBill folder into:
C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\

Start Tomcat and open:
http://localhost:8080/ElectricityBill/

6. Features
- Electricity slab calculation
- Consumer details
- Monthly/yearly billing
- Previous/current meter readings
- MySQL bill storage
- Dashboard
- Monthly consumption summary
- Bill history
- Search
- Paid/Unpaid status toggle
- Print bill
- Responsive design

IMPORTANT:
This project uses JSP scriptlets for simplicity and college-project demonstration.
