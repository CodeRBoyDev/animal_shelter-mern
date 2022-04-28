const Animal = require('../models/animal')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



exports.gethomeAnimal = catchAsyncErrors(async (req,res,next) => {
	
    const animal = await Animal.find({$and:[{ adoption_status: 'available'},{"adoption_request.request_status" : { $exists: false }}]});

	res.status(200).json({
		success: true,
		animal
	})
})

exports.getAnimalComment = catchAsyncErrors(async (req,res,next) => {

	const { id } = req.params;
    const animal = await Animal.findById(id).populate({ 
		path: 'comment',
		populate: {
		  path: 'user_id',
		  model: 'User'
		} 
	 });
	const animal_image = animal.animal_image;

	// let userCredComments = animal.comment.map(commentss => {
	
	// 	commentss.user_id.map(commentssss => {
	// 	console.log(commentssss.name)
	// 	})
    // })


	const allcomments = animal.comment;

	// console.log(userCredComments._id);

	res.status(200).json({
		success: true,
		animal, animal_image, allcomments
	})
})

