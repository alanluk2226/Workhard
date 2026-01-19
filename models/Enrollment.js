import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed'],
        default: 'active'
    },
    unenrollCount: {
        type: Number,
        default: 0
    },
    canReEnroll: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Remove the unique index to allow re-enrollment tracking
// enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Add compound index for active enrollments only
enrollmentSchema.index({ user: 1, course: 1, status: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
