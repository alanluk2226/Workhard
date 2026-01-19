// models/Course.js
import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
}, { _id: false });

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['yoga', 'bodyweight', 'hiit', 'circuittraining', 'pilates', 'cardiokickboxing', 'zumba', 'cardio', 'other']
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    // Support both old single schedule and new multiple schedules
    schedule: {
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        }
    },
    schedules: [scheduleSchema], // New field for multiple schedules
    maxParticipants: {
        type: Number,
        default: 20
    },
    currentParticipants: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'full'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
