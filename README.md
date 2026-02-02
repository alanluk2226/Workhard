**Project Name**
Server-Side Application --- **Fitness App: Workhard**
https://workhard-b5zs.onrender.com/
---
Built in Node.js with Express.js framework
---
Using MVC structure
---
Tested by vm Linux os: ubuntu
---
Language used: HTML, CSS, Javascript
---
Database used: MongoDB
---


A fitness app that allows a logged-in user to manage their own workout, enroll in fitness courses.
An admin system managed 
- the coaches
- the courses
- the promotions
- the users

---

#2 Project File Intro

**server.js**:  
- Authentication to connect to the user account.  
- Express for redirecting the client to different pages.  
- CRUD API for managing workout records.  
- Connect to MongoDB for the database service. 

**package.json**:  
- Express for the web server framework  
- EJS for template rendering  
- Passport for authentication  
- Express-session for user session management 

**public**:  
Contains two files  
- style.css to style the website  
- script.js allows the user to delete the form by clicking the button 

**views:**
- admin_index.ejs: Display and summarize of the admin system
- coach.ejs: Display all the coaches
- courses.ejs: Display all the courses
- my-courses.ejs: Display enrolled courses schedule
- create.ejs: A form for user to mark their workout record
- delete.ejs: Deletion that requires the user to confirm
- index.ejs: Display and summarize the workout
- login.ejs: Authentication using cookies
- read.ejs: Allow user to view, search, filter, and manage their exercise records
- register.ejs: New user can create a new account
- update.ejs: User can modify their record by the edit function

**models**:  
- Coach
- Course
- Enrollment
- Promotion
- User
- Workout

---
# Fitness App - API Curl Commands

This file contains all the curl commands for the Fitness App RESTful API.

## Base URL
```
http://localhost:8099/api
```

## Authentication Commands

### Register New User
```bash
curl -X POST http://localhost:8099/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","email":"test@example.com"}'
```

### Login User
```bash
curl -X POST http://localhost:8099/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"testuser","password":"password123"}'
```

### Login Admin
```bash
curl -X POST http://localhost:8099/api/login \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{"username":"admin123456","password":"123456"}'
```

### Get Current User
```bash
curl -X GET http://localhost:8099/api/current-user \
  -b cookies.txt
```

### Logout
```bash
curl -X GET http://localhost:8099/api/logout \
  -b cookies.txt
```

## User CRUD Operations

### Get All Users (Admin Only)
```bash
curl -X GET http://localhost:8099/api/users \
  -b admin_cookies.txt
```

### Get Single User
```bash
curl -X GET http://localhost:8099/api/users/USER_ID \
  -b cookies.txt
```

### Create User (Same as Register)
```bash
curl -X POST http://localhost:8099/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","password":"password123","email":"newuser@example.com"}'
```

### Update User Profile
```bash
# Update own profile
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "username": "newusername",
    "email": "newemail@example.com"
  }'
```

### Update User Password
```bash
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "password": "newpassword123"
  }'
```

### Admin Update Any User
```bash
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "username": "adminupdated",
    "email": "adminupdated@example.com"
  }'
```

### Delete User (Admin Only)
```bash
curl -X DELETE http://localhost:8099/api/users/USER_ID \
  -b admin_cookies.txt
```

## Coach CRUD Operations

### Get All Coaches
```bash
curl -X GET http://localhost:8099/api/coaches
```

### Get Single Coach
```bash
curl -X GET http://localhost:8099/api/coaches/COACH_ID
```

### Create Coach (Admin Only)
```bash
curl -X POST http://localhost:8099/api/coaches \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "New Coach",
    "email": "coach@example.com",
    "phone": "123-456-7890",
    "specialization": "yoga",
    "bio": "Experienced yoga instructor",
    "experience": 5,
    "image": "/images/coaches/new-coach.jpg",
    "employmentType": "full-time",
    "status": "active"
  }'
```

### Update Coach Information
```bash
curl -X PUT http://localhost:8099/api/coaches/COACH_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "Updated Coach Name",
    "specialization": "pilates",
    "experience": 7,
    "bio": "Updated bio with more experience",
    "employmentType": "part-time"
  }'
```

### Update Coach Status
```bash
curl -X PUT http://localhost:8099/api/coaches/COACH_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "status": "inactive"
  }'
```

### Delete Coach
```bash
curl -X DELETE http://localhost:8099/api/coaches/COACH_ID \
  -b admin_cookies.txt
```

## Course CRUD Operations

### Get All Courses
```bash
curl -X GET http://localhost:8099/api/courses
```

### Get Single Course
```bash
curl -X GET http://localhost:8099/api/courses/COURSE_ID
```

### Create Course (Admin Only)
```bash
curl -X POST http://localhost:8099/api/courses \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "New Yoga Class",
    "type": "yoga",
    "coach": "COACH_ID",
    "schedule": {
      "day": "Monday",
      "startTime": "10:00",
      "endTime": "11:00"
    },
    "maxParticipants": 15,
    "description": "Beginner-friendly yoga class",
    "status": "active"
  }'
```

### Update Course Details
```bash
curl -X PUT http://localhost:8099/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "Updated Yoga Class",
    "maxParticipants": 25,
    "description": "Updated description with new benefits",
    "schedule": {
      "day": "Tuesday",
      "startTime": "10:30",
      "endTime": "11:30"
    }
  }'
```

### Update Course Status
```bash
curl -X PUT http://localhost:8099/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "status": "cancelled"
  }'
```

### Delete Course
```bash
curl -X DELETE http://localhost:8099/api/courses/COURSE_ID \
  -b admin_cookies.txt
```

## Workout CRUD Operations

### Get All Workouts (User's Own)
```bash
curl -X GET http://localhost:8099/api/workouts \
  -b cookies.txt
```

### Get Single Workout
```bash
curl -X GET http://localhost:8099/api/workouts/WORKOUT_ID \
  -b cookies.txt
```

### Create Workout
```bash
curl -X POST http://localhost:8099/api/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "exerciseType": "cardio",
    "exerciseName": "Running",
    "date": "2024-01-15",
    "duration": 60,
    "caloriesBurned": 400,
    "intensity": "moderate",
    "distance": 5.0,
    "distanceUnit": "km",
    "notes": "Morning run in the park"
  }'
```

### Update Workout - Duration and Calories
```bash
curl -X PUT http://localhost:8099/api/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "duration": 75,
    "caloriesBurned": 500,
    "notes": "Extended run with hill training"
  }'
```

### Update Workout - Exercise Type and Details
```bash
curl -X PUT http://localhost:8099/api/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "exerciseType": "strength",
    "exerciseName": "Full Body Workout",
    "sets": 3,
    "reps": 15,
    "weight": 25.5,
    "intensity": "high"
  }'
```

### Update Workout - Partial Update (Notes Only)
```bash
curl -X PUT http://localhost:8099/api/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "notes": "Updated workout notes"
  }'
```

### Delete Workout
```bash
curl -X DELETE http://localhost:8099/api/workouts/WORKOUT_ID \
  -b cookies.txt
```

## Enrollment CRUD Operations

### Get All Enrollments (User's Own)
```bash
curl -X GET http://localhost:8099/api/enrollments \
  -b cookies.txt
```

### Get Single Enrollment
```bash
curl -X GET http://localhost:8099/api/enrollments/ENROLLMENT_ID \
  -b cookies.txt
```

### Create Enrollment (Enroll in Course)
```bash
curl -X POST http://localhost:8099/api/enrollments \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "courseId": "COURSE_ID"
  }'
```

### Update Enrollment Status
```bash
curl -X PUT http://localhost:8099/api/enrollments/ENROLLMENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "completed"
  }'
```

### Cancel Enrollment (Unenroll)
```bash
curl -X DELETE http://localhost:8099/api/enrollments/ENROLLMENT_ID \
  -b cookies.txt
```

## Promotion CRUD Operations

### Get All Promotions
```bash
curl -X GET http://localhost:8099/api/promotions
```

### Get Single Promotion
```bash
curl -X GET http://localhost:8099/api/promotions/PROMOTION_ID
```

### Create Promotion (Admin Only)
```bash
curl -X POST http://localhost:8099/api/promotions \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "courses": ["COURSE_ID_1", "COURSE_ID_2", "COURSE_ID_3"],
    "type": "featured",
    "status": "active",
    "startDate": "2024-01-15T00:00:00Z",
    "endDate": "2024-01-22T23:59:59Z"
  }'
```

### Update Promotion
```bash
curl -X PUT http://localhost:8099/api/promotions/PROMOTION_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "status": "expired",
    "endDate": "2024-01-20T23:59:59Z"
  }'
```

### Delete Promotion
```bash
curl -X DELETE http://localhost:8099/api/promotions/PROMOTION_ID \
  -b admin_cookies.txt
```

## Special Endpoints

### Health Check
```bash
curl -X GET http://localhost:8099/api/health
```

### Get Current Popular Promotion
```bash
curl -X GET http://localhost:8099/api/promotions/popular
```

### Refresh Popular Promotion (Admin Only)
```bash
curl -X POST http://localhost:8099/api/promotions/popular/refresh \
  -b admin_cookies.txt
```

### Track Promotion Enrollment
```bash
curl -X POST http://localhost:8099/api/promotions/PROMOTION_ID/track-enrollment \
  -b cookies.txt
```

### Legacy Course Enrollment
```bash
curl -X POST http://localhost:8099/api/courses/COURSE_ID/enroll \
  -b cookies.txt
```

### Legacy Course Unenrollment
```bash
curl -X POST http://localhost:8099/api/courses/COURSE_ID/unenroll \
  -b cookies.txt
```

## Complete Workflow Examples

### Complete User Workflow
```bash
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

# 4. Update workout (use ID from step 3)
curl -X PUT http://localhost:8099/api/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"duration":75,"caloriesBurned":500,"notes":"Extended workout"}'

# 5. Get courses
curl -X GET http://localhost:8099/api/courses

# 6. Enroll in course
curl -X POST http://localhost:8099/api/enrollments \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"courseId":"COURSE_ID"}'

# 7. Update user profile
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"email":"newemail@example.com"}'

# 8. Delete workout
curl -X DELETE http://localhost:8099/api/workouts/WORKOUT_ID \
  -b cookies.txt
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

# 3. Read coach details
curl -X GET http://localhost:8099/api/coaches/COACH_ID

# 4. Update coach
curl -X PUT http://localhost:8099/api/coaches/COACH_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"experience":5,"bio":"Updated coach bio"}'

# 5. Create course
curl -X POST http://localhost:8099/api/courses \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"New Yoga Class","type":"yoga","coach":"COACH_ID","schedule":{"day":"Monday","startTime":"10:00","endTime":"11:00"}}'

# 6. Read course details
curl -X GET http://localhost:8099/api/courses/COURSE_ID

# 7. Update course
curl -X PUT http://localhost:8099/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"maxParticipants":25,"description":"Updated course description"}'

# 8. View all users
curl -X GET http://localhost:8099/api/users \
  -b admin_cookies.txt

# 9. Delete course
curl -X DELETE http://localhost:8099/api/courses/COURSE_ID \
  -b admin_cookies.txt

# 10. Delete coach
curl -X DELETE http://localhost:8099/api/coaches/COACH_ID \
  -b admin_cookies.txt
```

### Complete CRUD Examples

#### Coach CRUD
```bash
# Create
curl -X POST http://localhost:8099/api/coaches \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"Test Coach","specialization":"pilates","experience":3}'

# Read
curl -X GET http://localhost:8099/api/coaches/COACH_ID

# Update
curl -X PUT http://localhost:8099/api/coaches/COACH_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"experience":5,"bio":"Updated experience and bio"}'

# Delete
curl -X DELETE http://localhost:8099/api/coaches/COACH_ID \
  -b admin_cookies.txt
```

#### Course CRUD
```bash
# Create
curl -X POST http://localhost:8099/api/courses \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"Test Course","type":"hiit","coach":"COACH_ID","schedule":{"day":"Wednesday","startTime":"18:00","endTime":"19:00"}}'

# Read
curl -X GET http://localhost:8099/api/courses/COURSE_ID

# Update
curl -X PUT http://localhost:8099/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{"name":"Updated Course Name","maxParticipants":30}'

# Delete
curl -X DELETE http://localhost:8099/api/courses/COURSE_ID \
  -b admin_cookies.txt
```

#### Workout CRUD
```bash
# Create
curl -X POST http://localhost:8099/api/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"exerciseType":"strength","exerciseName":"Push-ups","date":"2024-01-15","duration":30,"caloriesBurned":150}'

# Read
curl -X GET http://localhost:8099/api/workouts/WORKOUT_ID \
  -b cookies.txt

# Update
curl -X PUT http://localhost:8099/api/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"sets":4,"reps":20,"notes":"Increased intensity"}'

# Delete
curl -X DELETE http://localhost:8099/api/workouts/WORKOUT_ID \
  -b cookies.txt
```

#### User Profile Management
```bash
# Read own profile
curl -X GET http://localhost:8099/api/users/USER_ID \
  -b cookies.txt

# Update profile
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"username":"newusername","email":"newemail@example.com"}'

# Update password
curl -X PUT http://localhost:8099/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"password":"newpassword123"}'
```

## Notes

- Replace `USER_ID`, `COACH_ID`, `COURSE_ID`, `WORKOUT_ID`, `ENROLLMENT_ID`, `PROMOTION_ID` with actual IDs
- Make sure to login first and save cookies for authenticated requests
- Admin operations require admin login (admin123456/123456)
- All requests use JSON format with appropriate Content-Type headers



