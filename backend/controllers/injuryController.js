const Injury = require('../models/injury')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.newInjury = catchAsyncErrors(async(req,res,next) => {
// 	console.log('hi');
// res.status(200).json({
// 		success: 'hi'
// 	})
	
	const injury = await Injury.create(req.body);
	res.status(201).json({
		success:true,
		injury 
	})
})


exports.getInjury = catchAsyncErrors(async (req,res,next) => {
// console.log('hi');
// res.status(200).json({
// 		success: 'hi'
// 	})
	const injury = await Injury.find();
    const count = injury.length
	res.status(200).json({
		success: true,
		count,
		injury
	})
})

exports.read = catchAsyncErrors(async(req,res,next) => {

    const { id } = req.params;
    injury = await Injury.findById(id);
    res.json(injury);
})

exports.updateInjury = catchAsyncErrors(async(req,res,next) => {
	
    try{
        let injury = await Injury.findById(req.params.id);
        injury = await Injury.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })
        res.status(200).json({
            success:true,
            injury
        })
    }catch(err){
        res.status(400).json({
            message: "Injury not found"
        })
    }    
})

exports.deleteInjury = catchAsyncErrors(async (req, res, next) => {
    try{
    const injury = await Injury.findById(req.params.id);

    await injury.remove();

    res.status(200).json({
        success: true,
        message: 'Injury is deleted.'
    })
    }catch(err){
        res.status(400).json({
            message: "Injury not found"
        })
    }

})