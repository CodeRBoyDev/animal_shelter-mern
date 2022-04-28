const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    animal_name: {
        type: String,
        required: [true, 'Please enter animal name'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },
    animal_type: {
        type: String,
        required: [true, 'Please enter animal type'],
        enum: {
            values: [
                'cat',
                'dog',
            ],
            message: 'Please select correct type for animal'
        }
    },
    animal_sex: {
        type: String,
        required: [true, 'Please enter animal sex'],
        enum: {
            values: [
                'male',
                'female',
            ],
            message: 'Please select correct sex for animal'
        }
    },
    animal_breed: {
        type: String,
        required: [true, 'Please enter animal breed'],
    },
    animal_age: {
        type: Number,
        required: [true, 'Please enter animal age'],
        default: 0
    },
    animal_image:[
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        }
    ],
    health_status: {
        type: String,
        required: true,
        enum: {
            values: [
                'bad',
                'worst',
                'better',
            ],
            message: 'Please select correct health_status for animal'
        }
    },
    adoption_status: {
        type: String,
        required: true,
        enum: {
            values: [
                'available',
                'not available',
                'adopted',
            ],
            message: 'Please select correct adoption_status for animal'
        }
    },
    rescued_date: {
        type: Date,
        required: [true, 'Please enter rescued_Date'],
    },
    comment: [{
        user_id: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        }],
        comment: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    adoption_request: {
        user_id: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        }],
        request_status: {
            type: String,
            enum: {
                values: [
                    'pending',
                    'approved',
                ],
                message: 'Please select correct request_status for animal'
            }
        },
        createdAt: {
            type: Date,
        }
    },
    disease_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Disease'}],
    injury_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Injury'}],
        

});

module.exports = mongoose.model('Animal', animalSchema);