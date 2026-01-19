import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import User from './models/User.js';
import Workout from './models/Workout.js';
import Course from './models/Course.js';
import Coach from './models/Coach.js';
import Enrollment from './models/Enrollment.js';
import Promotion from './models/Promotion.js';

const app = express();

app.use(express.static('public'));

// Middleware
app.use(express.json());
// 修復 CORS 配置
app.use(cors({
    origin: true, // 允許所有來源，或者指定 'http://localhost:8099'
    credentials: true // 這很重要，允許發送 cookies 和會話信息
}));
app.use(express.urlencoded({ extended: true }));

// Session middleware (required for authentication)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// MongoDB connection
const uri = 'mongodb+srv://alanluk:projectTesting@cluster0.km9rij5.mongodb.net/fitness_user?retryWrites=true&w=majority';
const PORT = 8099;

// Set view engine
app.set('view engine', 'ejs');

// Simple authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes
app.get("/", (req, res) => {
    res.status(200).render('index', { 
        title: "Home page",
        user: req.session.user || null 
    });
});

app.get("/create", requireAuth, (req, res) => {
    res.status(200).render('create', { 
        title: "Create page",
        user: req.session.user 
    });
});

app.get("/read", requireAuth, (req, res) => {
    res.status(200).render('read', { 
        title: "Read page",
        user: req.session.user 
    });
});

app.get("/update", requireAuth, (req, res) => {
    res.status(200).render('update', { 
        title: "Update page",
        user: req.session.user 
    });
});

app.get("/delete", requireAuth, (req, res) => {
    res.status(200).render('delete', { 
        title: "Delete page",
        user: req.session.user 
    });
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.status(200).render('login', { title: "Login page" });
});

app.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.status(200).render('register', { title: "Register page" });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Logout failed' 
            });
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

// URL directory route for easy access to all app links
app.get(["/urls", "/links", "/sitemap"], (req, res) => {
    const baseUrl = `http://localhost:${PORT}`;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fitness App - URL Directory</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 2rem auto; 
                    padding: 2rem; 
                    background: #1a1a1a; 
                    color: #fff; 
                    line-height: 1.6;
                }
                h1, h2 { color: #00ff7f; }
                .url-section { 
                    background: rgba(0, 255, 127, 0.1); 
                    padding: 1.5rem; 
                    margin: 1rem 0; 
                    border-radius: 8px; 
                    border-left: 4px solid #00ff7f;
                }
                .url-link { 
                    display: block; 
                    color: #00ff7f; 
                    text-decoration: none; 
                    padding: 0.5rem 0; 
                    border-bottom: 1px solid rgba(0, 255, 127, 0.2);
                }
                .url-link:hover { 
                    background: rgba(0, 255, 127, 0.1); 
                    padding-left: 1rem;
                    transition: all 0.3s ease;
                }
                .description { 
                    color: #ccc; 
                    font-size: 0.9rem; 
                    margin-left: 1rem;
                }
                .admin-note {
                    background: rgba(255, 193, 7, 0.1);
                    border-left-color: #ffc107;
                    color: #ffc107;
                }
            </style>
        </head>
        <body>
            <h1>🏋️ Fitness App - URL Directory</h1>
            
            <div class="url-section">
                <h2>🌐 Main Application</h2>
                <a href="${baseUrl}/" class="url-link">${baseUrl}/</a>
                <div class="description">Main homepage - start here</div>
                
                <a href="${baseUrl}/login" class="url-link">${baseUrl}/login</a>
                <div class="description">User login page</div>
                
                <a href="${baseUrl}/register" class="url-link">${baseUrl}/register</a>
                <div class="description">New user registration</div>
            </div>

            <div class="url-section">
                <h2>🎯 User Features</h2>
                <a href="${baseUrl}/courses" class="url-link">${baseUrl}/courses</a>
                <div class="description">Browse available fitness courses</div>
                
                <a href="${baseUrl}/my-courses" class="url-link">${baseUrl}/my-courses</a>
                <div class="description">View enrolled courses (requires login)</div>
                
                <a href="${baseUrl}/create" class="url-link">${baseUrl}/create</a>
                <div class="description">Create new workout (requires login)</div>
                
                <a href="${baseUrl}/read" class="url-link">${baseUrl}/read</a>
                <div class="description">View my workouts (requires login)</div>
            </div>

            <div class="url-section admin-note">
                <h2>🔧 Admin Panel</h2>
                <a href="${baseUrl}/admin_index" class="url-link">${baseUrl}/admin_index</a>
                <div class="description">Admin dashboard (admin login required)</div>
                
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(255, 193, 7, 0.2); border-radius: 4px;">
                    <strong>Admin Credentials:</strong><br>
                    Username: <code>admin123456</code><br>
                    Password: <code>123456</code><br>
                    <em>Note: Admin accounts cannot use "Remember Me" function</em>
                </div>
            </div>

            <div class="url-section">
                <h2>🔗 API Endpoints</h2>
                <a href="${baseUrl}/api/health" class="url-link">${baseUrl}/api/health</a>
                <div class="description">Health check endpoint</div>
                
                <a href="${baseUrl}/api/courses" class="url-link">${baseUrl}/api/courses</a>
                <div class="description">Get all courses (JSON)</div>
                
                <a href="${baseUrl}/api/coaches" class="url-link">${baseUrl}/api/coaches</a>
                <div class="description">Get all coaches (JSON)</div>
            </div>

            <div style="text-align: center; margin-top: 2rem; padding: 1rem; border-top: 1px solid #333;">
                <p>💡 <strong>Quick Start:</strong> Visit <a href="${baseUrl}/" style="color: #00ff7f;">${baseUrl}/</a> to begin using the fitness app!</p>
            </div>
        </body>
        </html>
    `);
});

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });

        // Save user to database
        await newUser.save();

        // Automatically log in user after signup
        req.session.user = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };

        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                joinDate: newUser.joinDate
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during signup'
        });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;
        
        // Check for admin credentials first
        if (username === 'admin123456' && password === '123456') {
            // Check if remember me is checked for admin
            if (rememberMe) {
                return res.status(400).json({
                    success: false,
                    message: 'Error! Cannot remember admin account'
                });
            }
            
            // Create admin session
            req.session.user = {
                id: 'admin',
                username: 'admin123456',
                email: 'admin@system.com',
                isAdmin: true
            };
            
            return res.json({
                success: true,
                message: 'Admin login successful!',
                user: {
                    id: 'admin',
                    username: 'admin123456',
                    email: 'admin@system.com',
                    isAdmin: true
                },
                redirectTo: '/admin_index'
            });
        }
        
        // Find regular user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Create session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: false
        };
        
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                joinDate: user.joinDate,
                isAdmin: false
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
});

// Get current user route
app.get('/api/current-user', (req, res) => {
    if (req.session.user) {
        res.json({
            success: true,
            user: req.session.user
        });
    } else {
        res.json({
            success: false,
            message: 'No user logged in'
        });
    }
});

// Get all users route (for testing)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json({
            success: true,
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Fitness Workout Tracker API is running!',
        timestamp: new Date().toISOString()
    });
});

// Create (CRUD) workout
app.post('/api/workouts', requireAuth, async (req, res) => {
    try {
        const {
            exerciseType,
            exerciseName,
            date,
            startTime,
            endTime,
            duration,
            caloriesBurned,
            intensity,
            sets,
            reps,
            weight,
            distance,
            distanceUnit,
            notes
        } = req.body;

        // 驗證必需字段
        if (!exerciseType || !exerciseName || !date || !duration || !caloriesBurned) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: exerciseType, exerciseName, date, duration, caloriesBurned"
            });
        }

        // 創建 workout 對象
        const workoutData = {
            user: req.session.user.id,
            exerciseType,
            exerciseName,
            date: new Date(date),
            startTime: startTime ? new Date(startTime) : new Date(),
            endTime: endTime ? new Date(endTime) : new Date(new Date().getTime() + duration * 60000),
            duration: parseInt(duration),
            caloriesBurned: parseInt(caloriesBurned),
            intensity: intensity || 'moderate',
            status: 'completed'
        };

        // 可選字段
        if (sets) workoutData.sets = parseInt(sets);
        if (reps) workoutData.reps = parseInt(reps);
        if (weight) workoutData.weight = parseFloat(weight);
        if (distance) workoutData.distance = parseFloat(distance);
        if (distanceUnit) workoutData.distanceUnit = distanceUnit;
        if (notes) workoutData.notes = notes;

        const workout = new Workout(workoutData);
        await workout.save();
        
        res.status(201).json({ 
            success: true,
            message: 'Workout created successfully!',
            workout 
        });
    } catch (error) {
        console.error('Create workout error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || "server error"
        });
    }
});

// Read (CRUD) workout
app.get('/api/workouts', requireAuth, async (req, res) => {
    try {
        const workouts = await Workout.find({ 
            user: req.session.user.id 
        });
        res.json({ 
            success: true, 
            workouts 
        });
    } catch (error) {
        console.error('Read workouts error:', error);
        res.status(500).json({ 
            success: false, 
            error: "server error"
        });
    }
});

// Read One (CRUD) workout
app.get('/api/workouts/:id', requireAuth, async (req, res) => {
    try {
        const workout = await Workout.findOne({ 
            _id: req.params.id, 
            user: req.session.user.id 
        });
        if (!workout) return res.status(404).json({ 
            success: false, 
            error: 'Workout schedule not found' 
        });
        res.json({ 
            success: true, 
            workout 
        });
    } catch (error) {
        console.error('Read workout error:', error);
        res.status(500).json({ 
            success: false, 
            error: "server error"
        });
    }
});

// Update (CRUD) workout
app.put('/api/workouts/:id', requireAuth, async (req, res) => {
    try {
        console.log('Update workout request:', {
            id: req.params.id,
            userId: req.session.user.id,
            body: req.body
        });
        
        const workout = await Workout.findOneAndUpdate({ 
            _id: req.params.id, 
            user: req.session.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!workout) {
            console.log('Workout not found');
            return res.status(404).json({ 
                success: false, 
                error: 'Workout schedule not found' 
            });
        }
        
        console.log('Workout updated successfully:', workout);
        res.json({ 
            success: true, 
            workout 
        });
    } catch (error) {
        console.error('Update workout error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || "server error"
        });
    }
});

// Delete (CRUD) workout
app.delete('/api/workouts/:id', requireAuth, async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.session.user.id 
        });
        if (!workout) return res.status(404).json({ 
            success: false, 
            error: 'Workout schedule not found' 
        });
        res.json({ 
            success: true, 
            message: 'Workout schedule deleted' 
        });
    } catch (error) {
        console.error('Delete workout error:', error);
        res.status(500).json({ 
            success: false, 
            error: "server error"
        });
    }
});

// 課程相關 API 路由

// 獲取所有課程 - 添加調試信息
app.get('/api/courses', async (req, res) => {
    try {
        console.log('🔍 Debug: Fetching courses with populate...');
        
        // First, let's see all courses regardless of status
        const allCourses = await Course.find({});
        console.log('📋 Total courses in database:', allCourses.length);
        
        const courses = await Course.find({ status: 'active' })
            .populate('coach', 'name email phone specialization bio experience image employmentType')
            .sort({ 'schedule.day': 1, 'schedule.startTime': 1 });
        
        // 添加調試輸出
        console.log('📋 Active courses found:', courses.length);
        courses.forEach((course, index) => {
            console.log(`Course ${index + 1}: ${course.name}`);
            console.log(`  Type: ${course.type}`);
            console.log(`  Status: ${course.status}`);
            console.log(`  Coach:`, course.coach);
            if (course.coach && course.coach.name) {
                console.log(`  Coach name: "${course.coach.name}"`);
            } else {
                console.log(`  ❌ Coach data missing or invalid`);
            }
        });
        
        res.json({
            success: true,
            courses
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 獲取用戶已註冊的課程
app.get('/api/my-courses', requireAuth, async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ 
            user: req.session.user.id,
            status: 'active'
        }).populate({
            path: 'course',
            populate: {
                path: 'coach',
                select: 'name email phone specialization bio experience image employmentType'
            }
        });
        
        res.json({
            success: true,
            enrollments
        });
    } catch (error) {
        console.error('Get my courses error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 註冊課程
app.post('/api/courses/:courseId/enroll', requireAuth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                error: "Course not found"
            });
        }
        
        if (course.status !== 'active') {
            return res.status(400).json({
                success: false,
                error: "Course is not available for enrollment"
            });
        }
        
        if (course.currentParticipants >= course.maxParticipants) {
            return res.status(400).json({
                success: false,
                error: "Course is full"
            });
        }
        
        // 檢查是否已經有活躍的註冊
        const activeEnrollment = await Enrollment.findOne({
            user: req.session.user.id,
            course: req.params.courseId,
            status: 'active'
        });
        
        if (activeEnrollment) {
            return res.status(400).json({
                success: false,
                error: "Already enrolled in this course"
            });
        }
        
        // 檢查之前的註冊記錄和重新註冊限制
        const previousEnrollments = await Enrollment.find({
            user: req.session.user.id,
            course: req.params.courseId,
            status: 'cancelled'
        }).sort({ updatedAt: -1 });
        
        // 如果有之前取消的註冊記錄，檢查重新註冊限制
        if (previousEnrollments.length > 0) {
            const lastEnrollment = previousEnrollments[0];
            
            // 如果已經取消過一次且不能重新註冊
            if (!lastEnrollment.canReEnroll) {
                return res.status(400).json({
                    success: false,
                    error: "Error! You can not re-enroll."
                });
            }
            
            // 如果這是第二次註冊（第一次重新註冊），設置為不能再次重新註冊
            if (lastEnrollment.unenrollCount >= 1) {
                return res.status(400).json({
                    success: false,
                    error: "Error! You can not re-enroll."
                });
            }
        }
        
        // 創建新的註冊記錄
        const enrollment = new Enrollment({
            user: req.session.user.id,
            course: req.params.courseId,
            unenrollCount: 0,
            canReEnroll: true
        });
        
        await enrollment.save();
        
        // 更新課程參與人數
        course.currentParticipants += 1;
        if (course.currentParticipants >= course.maxParticipants) {
            course.status = 'full';
        }
        await course.save();
        
        res.json({
            success: true,
            message: "Successfully enrolled in the course",
            enrollment
        });
    } catch (error) {
        console.error('Enroll course error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 取消課程註冊
app.post('/api/courses/:courseId/unenroll', requireAuth, async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            user: req.session.user.id,
            course: req.params.courseId,
            status: 'active'
        });
        
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                error: "Enrollment not found"
            });
        }
        
        // 增加取消註冊次數
        const newUnenrollCount = enrollment.unenrollCount + 1;
        
        // 更新註冊記錄
        enrollment.status = 'cancelled';
        enrollment.unenrollCount = newUnenrollCount;
        
        // 如果這是第一次取消註冊，還可以重新註冊
        // 如果這是第二次取消註冊，就不能再重新註冊了
        if (newUnenrollCount >= 2) {
            enrollment.canReEnroll = false;
        }
        
        await enrollment.save();
        
        // 更新課程參與人數
        const course = await Course.findById(req.params.courseId);
        if (course) {
            course.currentParticipants = Math.max(0, course.currentParticipants - 1);
            if (course.status === 'full') {
                course.status = 'active';
            }
            await course.save();
        }
        
        let message = "Successfully unenrolled from the course";
        if (newUnenrollCount >= 2) {
            message += ". Note: You cannot re-enroll in this course again.";
        } else if (newUnenrollCount === 1) {
            message += ". You can re-enroll once more if needed.";
        }
        
        res.json({
            success: true,
            message: message,
            canReEnroll: enrollment.canReEnroll,
            unenrollCount: newUnenrollCount
        });
    } catch (error) {
        console.error('Unenroll course error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 獲取教練列表
app.get('/api/coaches', async (req, res) => {
    try {
        const coaches = await Coach.find({ status: 'active' });
        res.json({
            success: true,
            coaches
        });
    } catch (error) {
        console.error('Get coaches error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 獲取單個教練詳情
app.get('/api/coaches/:coachId', async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.coachId);
        if (!coach) {
            return res.status(404).json({
                success: false,
                error: "Coach not found"
            });
        }
        
        // 獲取教練的課程
        const courses = await Course.find({ 
            coach: req.params.coachId,
            status: 'active'
        });
        
        res.json({
            success: true,
            coach,
            courses
        });
    } catch (error) {
        console.error('Get coach error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// ===== PROMOTIONS API ROUTES =====

// Get current popular courses promotion
app.get('/api/promotions/popular', async (req, res) => {
    try {
        // Refresh promotions if needed (auto-create if expired)
        const promotion = await Promotion.refreshPromotionsIfNeeded();
        
        if (promotion) {
            // Increment views
            await promotion.incrementViews();
            
            res.json({
                success: true,
                promotion: {
                    id: promotion._id,
                    courses: promotion.courses,
                    startDate: promotion.startDate,
                    endDate: promotion.endDate,
                    views: promotion.views,
                    enrollments: promotion.enrollments
                }
            });
        } else {
            res.json({
                success: true,
                promotion: null,
                message: 'No popular courses promotion available'
            });
        }
    } catch (error) {
        console.error('Get popular promotion error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// Create new popular courses promotion (admin only)
app.post('/api/promotions/popular/refresh', async (req, res) => {
    try {
        // Check if user is admin (you can add proper admin auth here)
        if (!req.session.user || req.session.user.username !== 'admin123456') {
            return res.status(403).json({
                success: false,
                error: "Admin access required"
            });
        }
        
        const promotion = await Promotion.createPopularPromotion();
        
        res.json({
            success: true,
            message: 'New popular courses promotion created',
            promotion: {
                id: promotion._id,
                courses: promotion.courses,
                startDate: promotion.startDate,
                endDate: promotion.endDate
            }
        });
    } catch (error) {
        console.error('Create popular promotion error:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Server error"
        });
    }
});

// Get all promotions (admin only)
app.get('/api/promotions', async (req, res) => {
    try {
        // Check if user is admin
        if (!req.session.user || req.session.user.username !== 'admin123456') {
            return res.status(403).json({
                success: false,
                error: "Admin access required"
            });
        }
        
        const promotions = await Promotion.find()
            .populate({
                path: 'courses',
                populate: {
                    path: 'coach',
                    select: 'name email'
                }
            })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            promotions
        });
    } catch (error) {
        console.error('Get promotions error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// Track promotion enrollment
app.post('/api/promotions/:promotionId/track-enrollment', async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.promotionId);
        
        if (promotion && promotion.isValid) {
            await promotion.incrementEnrollments();
            
            res.json({
                success: true,
                message: 'Enrollment tracked'
            });
        } else {
            res.json({
                success: false,
                message: 'Promotion not found or expired'
            });
        }
    } catch (error) {
        console.error('Track enrollment error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// 課程頁面路由 - 修復後的版本
app.get("/courses", (req, res) => {
    res.status(200).render('courses', { 
        title: "Fitness Courses",
        user: req.session.user || null
    });
});

app.get("/my-courses", requireAuth, (req, res) => {
    res.status(200).render('my-courses', { 
        title: "My Courses",
        user: req.session.user
    });
});

// 教練詳情頁面 - 修復後的版本
app.get("/coach/:coachId", async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.coachId);
        if (!coach) {
            return res.status(404).render('404', { 
                title: "Coach Not Found",
                user: req.session.user || null
            });
        }
        
        const courses = await Course.find({ 
            coach: req.params.coachId,
            status: 'active'
        });
        
        res.status(200).render('coach', { 
            title: `Coach ${coach.name}`,
            user: req.session.user || null,
            coach,
            courses
        });
    } catch (error) {
        console.error('Coach page error:', error);
        res.status(500).render('error', { 
            title: "Error",
            user: req.session.user || null
        });
    }
});

// Admin routes
const requireAdminAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get("/admin_index", requireAdminAuth, (req, res) => {
    res.status(200).render('admin_index', { 
        title: "Admin Dashboard",
        user: req.session.user 
    });
});

app.get("/admin", requireAuth, (req, res) => {
    res.status(200).render('admin', { 
        title: "Admin Dashboard",
        user: req.session.user 
    });
});

// Admin API - Get all courses
app.get('/api/admin/courses', requireAdminAuth, async (req, res) => {
    try {
        const courses = await Course.find().populate('coach');
        res.json({ success: true, courses });
    } catch (error) {
        console.error('Admin get courses error:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Admin API - Create course
app.post('/api/admin/courses', requireAdminAuth, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.json({ success: true, course });
    } catch (error) {
        console.error('Admin create course error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Update course
app.put('/api/admin/courses/:id', requireAdminAuth, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
        res.json({ success: true, course });
    } catch (error) {
        console.error('Admin update course error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Delete course
app.delete('/api/admin/courses/:id', requireAdminAuth, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
        res.json({ success: true, message: 'Course deleted' });
    } catch (error) {
        console.error('Admin delete course error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Get all coaches
app.get('/api/admin/coaches', requireAdminAuth, async (req, res) => {
    try {
        const coaches = await Coach.find();
        res.json({ success: true, coaches });
    } catch (error) {
        console.error('Admin get coaches error:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Admin API - Create coach
app.post('/api/admin/coaches', requireAdminAuth, async (req, res) => {
    try {
        const coach = new Coach(req.body);
        await coach.save();
        res.json({ success: true, coach });
    } catch (error) {
        console.error('Admin create coach error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Update coach
app.put('/api/admin/coaches/:id', requireAdminAuth, async (req, res) => {
    try {
        console.log('Updating coach with ID:', req.params.id);
        console.log('Update data:', req.body);
        
        const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true 
        });
        
        if (!coach) {
            console.log('Coach not found with ID:', req.params.id);
            return res.status(404).json({ success: false, error: 'Coach not found' });
        }
        
        console.log('Coach updated successfully:', coach);
        res.json({ success: true, coach });
    } catch (error) {
        console.error('Admin update coach error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Delete coach
app.delete('/api/admin/coaches/:id', requireAdminAuth, async (req, res) => {
    try {
        const coach = await Coach.findByIdAndDelete(req.params.id);
        if (!coach) return res.status(404).json({ success: false, error: 'Coach not found' });
        res.json({ success: true, message: 'Coach deleted' });
    } catch (error) {
        console.error('Admin delete coach error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Get all users
app.get('/api/admin/users', requireAdminAuth, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json({ success: true, users });
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Admin API - Change user password
app.put('/api/admin/users/:id/password', requireAdminAuth, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashedPassword },
            { new: true }
        );
        
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, message: 'Password updated' });
    } catch (error) {
        console.error('Admin change password error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Delete user
app.delete('/api/admin/users/:id', requireAdminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        
        // Also delete user's workouts and enrollments
        await Workout.deleteMany({ user: req.params.id });
        await Enrollment.deleteMany({ user: req.params.id });
        
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error('Admin delete user error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API - Get enrollments count
app.get('/api/admin/enrollments', requireAdminAuth, async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json({ success: true, enrollments });
    } catch (error) {
        console.error('Admin get enrollments error:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Atlas successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`\n🌐 Application URLs:`);
    console.log(`   🏠 Main App: http://localhost:${PORT}/`);
    console.log(`   🔐 Login: http://localhost:${PORT}/login`);
    console.log(`   📝 Register: http://localhost:${PORT}/register`);
    console.log(`   🎯 Courses: http://localhost:${PORT}/courses`);
    console.log(`   📚 My Courses: http://localhost:${PORT}/my-courses`);
    console.log(`   💪 Create Workout: http://localhost:${PORT}/create`);
    console.log(`   📊 My Workouts: http://localhost:${PORT}/read`);
    console.log(`\n🔧 Admin Panel:`);
    console.log(`   👑 Admin Dashboard: http://localhost:${PORT}/admin_index`);
    console.log(`   📋 Admin Login: Use username: admin123456, password: 123456`);
    console.log(`\n💡 Quick Start:`);
    console.log(`   1. Open: http://localhost:${PORT}/ in your browser`);
    console.log(`   2. Register a new account or login with existing credentials`);
    console.log(`   3. For admin access, login with admin123456/123456`);
    await connectToDatabase();
});
