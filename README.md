**Project Name**
Server-Side Application --- **Fitness App: Workhard**
https://workhard-b5zs.onrender.com/
Built in Node.js with Express.js framework
Using MVC structure
Language used: HTML, CSS, Javascript
Database used: MongoDB


A fitness app that allows a logged-in user to manage their own workout, enroll in fitness courses.
An admin system managed the coaches, courses, promotions, users.

---

#2 Project File Intro

**server.js**:  
-Authentication to connect to the user account.  
-Express for redirecting the client to different pages.  
-CRUD API for managing workout records.  
-Connect to MongoDB for the database service. 

**package.json**:  
-Express for the web server framework  
-EJS for template rendering  
-Passport for authentication  
-Express-session for user session management 

**public**:  
Contains two files  
-style.css to style the website  
-script.js allows the user to delete the form by clicking the button 

**views**: 
-admin_index.ejs: Display and summarize of the admin system
-coach.ejs: Display all the coaches
-courses.ejs: Display all the courses
-my-courses.ejs: Display enrolled courses schedule
-create.ejs: A form for user to mark their workout record  
-delete.ejs: Deletion that requires the user to confirm  
-index.ejs: Display and summarize the workout  
-login.ejs: Authentication using cookies
-read.ejs: Allow user to view, search, filter, and manage their exercise records  
-register.ejs: New user can create a new account  
-update.ejs: User can modify their record by the edit function  

**models**:  
Coach
Course
Enrollment
Promotion
User
Workout

---



