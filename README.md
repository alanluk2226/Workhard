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
### 1. Register New User
```bash
curl -X POST $BASE_URL/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'
```

### 2. Login User
```bash
curl -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Login Admin
```bash
curl -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{
    "username": "admin123456",
    "password": "123456"
  }'
```

### 4. Get Current User
```bash
curl -X GET $BASE_URL/current-user \
  -b cookies.txt
```

## USER CRUD Operations

### 1. Get All Users (Admin Only)
```bash
# Basic request
curl -X GET $BASE_URL/users \
  -b admin_cookies.txt

# With pagination
curl -X GET "$BASE_URL/users?page=1&limit=5" \
  -b admin_cookies.txt

# With search
curl -X GET "$BASE_URL/users?search=test" \
  -b admin_cookies.txt
```

### 2. Get Single User
```bash
# Get own profile
curl -X GET $BASE_URL/users/USER_ID \
  -b cookies.txt

# Admin get any user
curl -X GET $BASE_URL/users/USER_ID \
  -b admin_cookies.txt
```

### 3. Create User (Registration)
```bash
curl -X POST $BASE_URL/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "newpassword123",
    "email": "newuser@example.com"
  }'
```

### 4. Update User
```bash
# Update own profile
curl -X PUT $BASE_URL/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "username": "updateduser",
    "email": "updated@example.com"
  }'

# Update password
curl -X PUT $BASE_URL/users/USER_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "password": "newpassword456"
  }'
```

### 5. Delete User (Admin Only)
```bash
curl -X DELETE $BASE_URL/users/USER_ID \
  -b admin_cookies.txt
```

## COACH CRUD Operations

### 1. Get All Coaches
```bash
# Basic request
curl -X GET $BASE_URL/coaches

# With pagination
curl -X GET "$BASE_URL/coaches?page=1&limit=5"

# Filter by status
curl -X GET "$BASE_URL/coaches?status=active"

# Filter by specialization
curl -X GET "$BASE_URL/coaches?specialization=yoga"
```

### 2. Get Single Coach
```bash
curl -X GET $BASE_URL/coaches/COACH_ID
```

### 3. Create Coach (Admin Only)
```bash
curl -X POST $BASE_URL/coaches \
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

### 4. Update Coach (Admin Only)
```bash
curl -X PUT $BASE_URL/coaches/COACH_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "Updated Coach Name",
    "specialization": "pilates",
    "experience": 7
  }'
```

### 5. Delete Coach (Admin Only)
```bash
curl -X DELETE $BASE_URL/coaches/COACH_ID \
  -b admin_cookies.txt
```

## COURSE CRUD Operations

### 1. Get All Courses
```bash
# Basic request
curl -X GET $BASE_URL/courses

# With pagination
curl -X GET "$BASE_URL/courses?page=1&limit=5"

# Filter by type
curl -X GET "$BASE_URL/courses?type=yoga"

# Filter by status
curl -X GET "$BASE_URL/courses?status=active"

# Filter by coach
curl -X GET "$BASE_URL/courses?coachId=COACH_ID"
```

### 2. Get Single Course
```bash
curl -X GET $BASE_URL/courses/COURSE_ID
```

### 3. Create Course (Admin Only)
```bash
curl -X POST $BASE_URL/courses \
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

### 4. Update Course (Admin Only)
```bash
curl -X PUT $BASE_URL/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "name": "Updated Yoga Class",
    "maxParticipants": 20,
    "description": "Updated description"
  }'
```

### 5. Delete Course (Admin Only)
```bash
curl -X DELETE $BASE_URL/courses/COURSE_ID \
  -b admin_cookies.txt
```

## WORKOUT CRUD Operations

### 1. Get All Workouts (User's Own)
```bash
# Basic request
curl -X GET $BASE_URL/workouts \
  -b cookies.txt

# With pagination
curl -X GET "$BASE_URL/workouts?page=1&limit=5" \
  -b cookies.txt

# Filter by exercise type
curl -X GET "$BASE_URL/workouts?exerciseType=cardio" \
  -b cookies.txt

# Filter by date range
curl -X GET "$BASE_URL/workouts?startDate=2024-01-01&endDate=2024-12-31" \
  -b cookies.txt
```

### 2. Get Single Workout
```bash
curl -X GET $BASE_URL/workouts/WORKOUT_ID \
  -b cookies.txt
```

### 3. Create Workout
```bash
curl -X POST $BASE_URL/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "exerciseType": "cardio",
    "exerciseName": "Running",
    "date": "2024-01-15",
    "startTime": "2024-01-15T08:00:00Z",
    "endTime": "2024-01-15T09:00:00Z",
    "duration": 60,
    "caloriesBurned": 400,
    "intensity": "moderate",
    "distance": 5.0,
    "distanceUnit": "km",
    "notes": "Morning run in the park"
  }'
```

### 4. Update Workout
```bash
curl -X PUT $BASE_URL/workouts/WORKOUT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "duration": 75,
    "caloriesBurned": 500,
    "notes": "Extended run with hills"
  }'
```

### 5. Delete Workout
```bash
curl -X DELETE $BASE_URL/workouts/WORKOUT_ID \
  -b cookies.txt
```

## ENROLLMENT CRUD Operations

### 1. Get All Enrollments
```bash
# User's own enrollments
curl -X GET $BASE_URL/enrollments \
  -b cookies.txt

# Admin view all enrollments
curl -X GET $BASE_URL/enrollments \
  -b admin_cookies.txt

# With pagination
curl -X GET "$BASE_URL/enrollments?page=1&limit=5" \
  -b cookies.txt

# Filter by status
curl -X GET "$BASE_URL/enrollments?status=active" \
  -b cookies.txt

# Filter by course
curl -X GET "$BASE_URL/enrollments?courseId=COURSE_ID" \
  -b cookies.txt
```

### 2. Get Single Enrollment
```bash
curl -X GET $BASE_URL/enrollments/ENROLLMENT_ID \
  -b cookies.txt
```

### 3. Create Enrollment (Enroll in Course)
```bash
curl -X POST $BASE_URL/enrollments \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "courseId": "COURSE_ID"
  }'
```

### 4. Update Enrollment Status
```bash
curl -X PUT $BASE_URL/enrollments/ENROLLMENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "completed"
  }'
```

### 5. Cancel Enrollment (Unenroll)
```bash
curl -X DELETE $BASE_URL/enrollments/ENROLLMENT_ID \
  -b cookies.txt
```

## PROMOTION CRUD Operations

### 1. Get All Promotions
```bash
# Basic request
curl -X GET $BASE_URL/promotions

# With pagination
curl -X GET "$BASE_URL/promotions?page=1&limit=5"

# Filter by type
curl -X GET "$BASE_URL/promotions?type=popular"

# Filter by status
curl -X GET "$BASE_URL/promotions?status=active"
```

### 2. Get Single Promotion
```bash
curl -X GET $BASE_URL/promotions/PROMOTION_ID
```

### 3. Create Promotion (Admin Only)
```bash
curl -X POST $BASE_URL/promotions \
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

### 4. Update Promotion (Admin Only)
```bash
curl -X PUT $BASE_URL/promotions/PROMOTION_ID \
  -H "Content-Type: application/json" \
  -b admin_cookies.txt \
  -d '{
    "status": "expired",
    "endDate": "2024-01-20T23:59:59Z"
  }'
```

### 5. Delete Promotion (Admin Only)
```bash
curl -X DELETE $BASE_URL/promotions/PROMOTION_ID \
  -b admin_cookies.txt
```

## Special Endpoints

### 1. Get Current Popular Promotion
```bash
curl -X GET $BASE_URL/promotions/popular
```

### 2. Refresh Popular Promotion (Admin Only)
```bash
curl -X POST $BASE_URL/promotions/popular/refresh \
  -b admin_cookies.txt
```

### 3. Track Promotion Enrollment
```bash
curl -X POST $BASE_URL/promotions/PROMOTION_ID/track-enrollment \
  -b cookies.txt
```

### 4. Enroll in Course (Legacy Endpoint)
```bash
curl -X POST $BASE_URL/courses/COURSE_ID/enroll \
  -b cookies.txt
```

### 5. Unenroll from Course (Legacy Endpoint)
```bash
curl -X POST $BASE_URL/courses/COURSE_ID/unenroll \
  -b cookies.txt
```

### 6. Health Check
```bash
curl -X GET $BASE_URL/health
```

## Batch Operations Examples

### 1. Create Multiple Workouts
```bash
# Create workout 1
curl -X POST $BASE_URL/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "exerciseType": "strength",
    "exerciseName": "Push-ups",
    "date": "2024-01-15",
    "duration": 30,
    "caloriesBurned": 150,
    "sets": 3,
    "reps": 20
  }'

# Create workout 2
curl -X POST $BASE_URL/workouts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "exerciseType": "cardio",
    "exerciseName": "Cycling",
    "date": "2024-01-16",
    "duration": 45,
    "caloriesBurned": 300,
    "distance": 10,
    "distanceUnit": "km"
  }'
```



