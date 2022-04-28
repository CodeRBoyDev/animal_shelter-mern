const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    age: {
        type: Number,
        required: [true, 'Please enter animal age'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone'],
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    profile_picture: {
        public_id: {
            type: String,
           
        },
        url: {
            type: String,
         
        }
    },
    role: {
        type: String,
        enum: {
            values: [
                'admin',
                'employee',
                'adopter',
            ],
            message: 'Please select correct role for user'
        }
    },
    status: {
        type: String,
        enum: {
            values: [
                'active',
                'inactive',
            ],
            message: 'Please select status role for user'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



// // Generate password reset token
// userSchema.methods.getResetPasswordToken = function () {
//     // Generate token
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     // Hash and set to resetPasswordToken
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

//     // Set token expire time
//     this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

//     return resetToken

// }

module.exports = mongoose.model('User', userSchema);