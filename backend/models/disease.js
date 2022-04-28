const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema({
    disease_name: {
        type: String,
        required: [true, 'Please provide disease name'],
        trim: true,
        maxLength: [50, 'Disease name cannot exceed 50 characters']
    },
    disease_description: {
        type: String,
        required: [true, 'Please provide description'],
    },
});

module.exports = mongoose.model('Disease', diseaseSchema);