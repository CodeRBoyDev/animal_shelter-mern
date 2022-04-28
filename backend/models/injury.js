const mongoose = require('mongoose')

const injurySchema = new mongoose.Schema({
    injury_name: {
        type: String,
        required: [true, 'Please enter injury name'],
        trim: true,
        maxLength: [100, 'Injury name cannot exceed 100 characters']
    },
    injury_description: {
        type: String,
        required: [true, 'Please enter injury description'],
    },
});

module.exports = mongoose.model('Injury', injurySchema);