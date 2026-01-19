import mongoose from 'mongoose';

const coachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return v && v.toLowerCase() !== 'n/a';
            },
            message: 'Coach name is required and cannot be "N/A"'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'N/A'
    },
    phone: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    specialization: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    bio: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    experience: {
        type: Number,
        min: 0,
        default: 0
    },
    image: {
        type: String, 
        default: 'N/A'
    },
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time'],
        default: 'full-time'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Coach = mongoose.model('Coach', coachSchema);
export default Coach;
