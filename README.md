**Project Name**
Server-Side Application --- **Fitness App: Workhard**
https://workhard-b5zs.onrender.com/
Built in Node.js with Express.js framework
Using MVC structure
Tested by vm Linux os: ubuntu
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
# 1. Register
curl -X POST http://localhost:8099/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","email":"test@example.com"}'

# 2. Login
curl -X POST http://localhost:8099/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"testuser","password":"password123"}'

# 3. Create workout
curl -X POST http://localhost:8099/api/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"exerciseType":"cardio","exerciseName":"Running","date":"2024-01-15","duration":60,"caloriesBurned":400}'

# 4. Get courses
curl -X GET http://localhost:8099/api/courses

# 5. Enroll in course
curl -X POST http://localhost:8099/api/enrollments \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"courseId":"COURSE_ID"}'
```

### Admin Workflow
```bash
# 1. Admin login
curl -X POST http://localhost:8099/api/login \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{"username":"admin123456","password":"123456"}'

# 2. Create coach
curl -X POST http://localhost:8099/api/coaches \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"New Coach","specialization":"yoga","status":"active"}'

# 3. Create course
curl -X POST http://localhost:8099/api/courses \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"New Yoga Class","type":"yoga","coach":"COACH_ID","schedule":{"day":"Monday","startTime":"10:00","endTime":"11:00"}}'

# 4. View all users
curl -X GET http://localhost:8099/api/users \
  -b admin_cookies.txt
```



