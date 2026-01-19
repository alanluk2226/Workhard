import mongoose from 'mongoose';
import Course from '../models/Course.js';
import Coach from '../models/Coach.js';

const MONGODB_URI = 'mongodb+srv://alanluk:projectTesting@cluster0.km9rij5.mongodb.net/fitness_user?retryWrites=true&w=majority';

async function testConnection() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check coaches
        const coaches = await Coach.find({});
        console.log(`📋 Found ${coaches.length} coaches in database`);
        
        // Check courses
        const allCourses = await Course.find({});
        console.log(`📋 Found ${allCourses.length} total courses in database`);
        
        const activeCourses = await Course.find({ status: 'active' });
        console.log(`📋 Found ${activeCourses.length} active courses in database`);
        
        // Show course details
        if (allCourses.length > 0) {
            console.log('\n📚 Course details:');
            allCourses.forEach((course, index) => {
                console.log(`${index + 1}. ${course.name}`);
                console.log(`   Type: ${course.type}`);
                console.log(`   Status: ${course.status}`);
                console.log(`   Coach ID: ${course.coach}`);
                console.log(`   Schedule: ${course.schedule?.day} ${course.schedule?.startTime}-${course.schedule?.endTime}`);
                console.log('');
            });
        }
        
        // Test the API query
        console.log('🔍 Testing API query...');
        const apiCourses = await Course.find({ status: 'active' })
            .populate('coach', 'name email phone specialization bio experience image employmentType')
            .sort({ 'schedule.day': 1, 'schedule.startTime': 1 });
        
        console.log(`📋 API query returned ${apiCourses.length} courses`);
        
        if (apiCourses.length > 0) {
            console.log('\n🎯 API courses with populated coach data:');
            apiCourses.forEach((course, index) => {
                console.log(`${index + 1}. ${course.name}`);
                console.log(`   Type: ${course.type}`);
                console.log(`   Coach: ${course.coach?.name || 'NO COACH DATA'}`);
                console.log('');
            });
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

testConnection();