const User = require('../models/user')
const Animal = require('../models/animal')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary')
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

  
    if (!email || !password) {
        res.status(201).json({
            message:'Please enter email & password'
        })
    }


    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        res.status(201).json({
            message:'The email is not exist'
        })
    }

    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(201).json({
            message:'Wrong password'
        })
    }

    if(user.status === 'inactive'){
        res.status(201).json({
            message:'inactive'
        })
    }
    
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // sendToken(user, 200, res)
    return res.json({ token, user });
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})



exports.newUSer = catchAsyncErrors(async(req,res,next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.profile_picture, {
        folder: 'profile_picture',
        width: 150,
        crop: "scale"
    })

    const { name, age, phone, address, email, password, role, status} = req.body;
        
    const user = await User.create({
        name, age, phone, address, email, password,
        profile_picture: {
            public_id: result.public_id,
            url: result.secure_url
        },
        role: role,
        status: status
    })

    res.status(201).json({
        success:true
    })

    })

exports.adopterUser = catchAsyncErrors(async(req,res,next) => {

    try {
        const { name, age, phone, address, email, password, role, status} = req.body;
        
        const user = await User.create({
            name, age, phone, address, email, password,
            profile_picture: {
                public_id: 'profile_picture/jttdi63mt8a6e4ndt3icdsadsada',
                url: 'https://pbs.twimg.com/media/Cqny3hKWAAADr8z.jpg'
            },
            role: role,
            status: status
        })
    
        res.status(201).json({
            success:true
        })
        
        }  catch (error) {
            if (error.name === "ValidationError") {
              let errors = {};
        
              Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
              });
              
              console.log(errors)
        
              return res.status(400).send(errors);
            }
            res.status(500).send("Something went wrong");
          }

   

    })

exports.getUser = catchAsyncErrors(async (req,res,next) => {
// console.log('hi');
// res.status(200).json({
// 		success: 'hi'
// 	})
	const user = await User.find({ role: 'employee' });

	res.status(200).json({
		success: true,
		user
	})
})


exports.getADopter = catchAsyncErrors(async (req,res,next) => {
    // console.log('hi');
    // res.status(200).json({
    // 		success: 'hi'
    // 	})
        const user = await User.find({ role: 'adopter' });
    
        res.status(200).json({
            success: true,
            user
        })
    })

exports.updateAdopterStatus = catchAsyncErrors(async(req,res,next) => {

	const newUserData = {
        status: req.body.status, 
    }

            const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

            res.status(200).json({
                success: true
            }) 
})

exports.updateEmployee = catchAsyncErrors(async(req,res,next) => {

    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email, 
    }

    console.log(req.params.id)

    if (req.body.profile_picture !== '') {
        const user = await User.findById(req.params.id)

        const image_id = user.profile_picture.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.profile_picture, {
            folder: 'profile_picture',
            width: 150,
            crop: "scale"
        })

        newUserData.profile_picture = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
	
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    }) 
})

exports.updateAdopter= catchAsyncErrors(async(req,res,next) => {

    const password = await bcrypt.hash(req.body.password, 10)

    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email, 
        password: password, 
    }

    // console.log(req.params.id)

    if (req.body.profile_picture !== '') {
        const user = await User.findById(req.params.id)

        const image_id = user.profile_picture.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.profile_picture, {
            folder: 'profile_picture',
            width: 150,
            crop: "scale"
        })

        newUserData.profile_picture = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
	
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    }) 
})

exports.read = catchAsyncErrors(async(req,res,next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const profile_picture = user.profile_picture.url;
    console.log(id);
    const animal_pending = await Animal.find({$and:[{'adoption_request.user_id' : id},{'adoption_request.request_status' : 'pending'}]}  ).populate({ 
		path: 'adoption_request',
		populate: {
		  path: 'user_ids',
		  model: 'User'
		} 
	 });

     const animal_approved = await Animal.find({$and:[{'adoption_request.user_id' : id},{'adoption_request.request_status' : 'approved'}]}).populate({ 
		path: 'adoption_request',
		populate: {
		  path: 'user_ids',
		  model: 'User'
		} 
	 });
     

// console.log(animal, req.params.id);
    res.json({user, profile_picture, animal_pending, animal_approved});
})

exports.updateEmployee = catchAsyncErrors(async(req,res,next) => {

    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email, 
    }

    console.log(req.params.id)

    if (req.body.profile_picture !== '') {
        const user = await User.findById(req.params.id)

        const image_id = user.profile_picture.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.profile_picture, {
            folder: 'profile_picture',
            width: 150,
            crop: "scale"
        })

        newUserData.profile_picture = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
	
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    }) 
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    try{
    const user = await User.findById(req.params.id);

        cloudinary.v2.uploader.destroy(user.profile_picture.public_id);
 

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'user is deleted.'
    })
    }catch(err){
        res.status(400).json({
            message: "user not found"
        })
    }

})
