POWERBILL - PHP + MySQL Electricity Billing System

Requirements:
- XAMPP
- Apache
- MySQL/MariaDB
- PHP 7.4+ recommended

Installation:
1. Extract the project folder into:
   C:\xampp\htdocs\electricity_bill_project

2. Start Apache and MySQL from XAMPP Control Panel.

3. Open phpMyAdmin:
   http://localhost/phpmyadmin

4. Import database.sql.
   This creates:
   - electricity_billing database
   - users table
   - bills table

5. Check config.php.
   Default XAMPP settings are:
   host = localhost
   username = root
   password = empty

6. Open:
   http://localhost/electricity_bill_project/

Features:
- User registration and login
- Secure password hashing
- Responsive dashboard
- Monthly electricity billing
- Exact tariff slabs:
  First 50: Rs. 3.50/unit
  Next 100: Rs. 4.00/unit
  Next 100: Rs. 5.20/unit
  Above 250: Rs. 6.50/unit
- Live bill preview
- Save/update one bill per month per user
- Paid/Unpaid status
- Monthly bill history
- Month filtering
- Usage and amount statistics
- Mobile responsive UI

Important:
Use register.php to create the first account.
