const Disease = require('../models/disease')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
       const formattedErrors = errors.join(' ');
       res.status(code).send({messages: formattedErrors, fields:     fields});
     } else {
        res.status(code).send({messages: errors, fields: fields})
     }
 }
 
exports.newDisease = catchAsyncErrors(async(req,res,next) => {
	// console.log(req.body);
    try {
	const disease = await Disease.create(req.body);
	res.status(201).json({
		success:true,
		disease 
	})}  catch (error) {
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

exports.getDisease = catchAsyncErrors(async (req,res,next) => {

	const disease = await Disease.find();
    const count = disease.length
	res.status(200).json({
		success: true,
		count,
		disease
	})
})

exports.read = catchAsyncErrors(async(req,res,next) => {

    const { id } = req.params;
    disease = await Disease.findById(id);
    res.json(disease);
})

exports.updateDisease = catchAsyncErrors(async(req,res,next) => {
	
    try{
        let disease = await Disease.findById(req.params.id);
        disease = await Disease.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })
        res.status(200).json({
            success:true,
            disease
        })
    }catch(err){
        res.status(400).json({
            message: "Disease not found"
        })
    }    
})

exports.deleteDisease = catchAsyncErrors(async (req, res, next) => {
    try{
    const disease = await Disease.findById(req.params.id);

    await disease.remove();

    res.status(200).json({
        success: true,
        message: 'Disease is deleted.'
    })
    }catch(err){
        res.status(400).json({
            message: "Disease not found"
        })
    }

})