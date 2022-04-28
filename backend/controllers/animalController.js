const Animal = require('../models/animal')
const Injury = require('../models/injury')
const Disease = require('../models/disease')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary')
const swearjar = require('swearjar');

exports.newAnimal = catchAsyncErrors(async(req,res,next) => {

    try {
        const result = await cloudinary.v2.uploader.upload(req.body.animal_image, {
            folder: 'animals',
        })
    
        const { animal_name, animal_type, animal_sex, animal_breed, animal_age, rescued_date, disease_id, injury_id, totalInjurys, totalDiseases} = req.body;
    
       
        const totalDiseasessss = Number(totalDiseases);
        const totalInjurysssss = Number(totalInjurys);
        const total_illness = totalDiseasessss + totalInjurysssss;
        // console.log(total_illness);
    
        if(total_illness == 1 || total_illness == 2){
            var health = 'bad'
           
        }else if(total_illness > 2){
            var health = 'worst'
    
        }else{
            var health = 'better'
        }
    
        if (total_illness >= 1){
            var adoption_status = 'not available';
        }
    
        else{
            var adoption_status = 'available';
        }
    
        // console.log(health);
        
    
    
    
    
        const animal = await Animal.create({
            animal_name,
            animal_type,
            animal_sex,
            animal_breed,
            animal_age,
            animal_image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            adoption_request: {
                createdAt: new Date()
            },
            rescued_date: rescued_date,
            disease_id: disease_id,
            injury_id: injury_id,
            health_status: health,
            adoption_status: adoption_status,
        })
    
        
       
    
        // console.log(animal);
        res.status(201).json({
            success:true,
            animal
        })
    }
    catch (error){
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

exports.getCreateAnimal= catchAsyncErrors(async (req,res,next) => {

    const disease = await Disease.find();
    const injury = await Injury.find();

	res.status(200).json({
		success: true,
        disease,
        injury
	})
})
exports.getAnimal= catchAsyncErrors(async (req,res,next) => {


	const animal = await Animal.find().populate('disease_id').populate('injury_id');
	res.status(200).json({
		success: true,
		animal,
	})
})

exports.read = catchAsyncErrors(async(req,res,next) => {
    const disease = await Disease.find();
    const injury = await Injury.find();

    const { id } = req.params;
    animal = await Animal.findById(id);
    const animal_image = animal.animal_image;
    const checkdiseasekanimal = animal.disease_id;
    const checkinjurykanimal = animal.injury_id;
    res.json({animal, animal_image, disease,
        injury, checkdiseasekanimal, checkinjurykanimal});
})

exports.updateAnimal = catchAsyncErrors(async(req,res,next) => {

    const animalssss = await Animal.findByIdAndUpdate(req.params.id,{
        $unset: { injury_id:"",disease_id: ""}
    }, 
    {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const totalDiseasessss = Number(req.body.totalDiseases);
    const totalInjurysssss = Number(req.body.totalInjurys);
    const total_illness = totalDiseasessss + totalInjurysssss;
    // console.log(total_illness);

    if(total_illness == 1 || total_illness == 2){
        var health = 'bad'
       
    }else if(total_illness > 2){
        var health = 'worst'

    }else{
        var health = 'better'
    }

    if (total_illness >= 1){
        var adoption_status = 'not available';
    }

    else{
        var adoption_status = 'available';
    }


    const newAnimalData = {
        animal_name: req.body.animal_name,
        animal_type: req.body.animal_type,
        animal_sex: req.body.animal_sex,
        animal_breed: req.body.animal_breed,
        animal_age: req.body.animal_age, 
        rescued_date: req.body.rescued_date, 
        injury_id: req.body.injury_id, 
        disease_id: req.body.disease_id, 
        health_status: health,
        adoption_status: adoption_status,
    }

    // console.log(req.body.animal_image)
    


    if (req.body.animal_image !== '') {
        const animal = await Animal.findById(req.params.id)

        animal.animal_image.map(animal => {
            cloudinary.v2.uploader.destroy(animal.public_id);
        });

        const result = await cloudinary.v2.uploader.upload(req.body.animal_image, {
            folder: 'animals',
        })

        newAnimalData.animal_image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
	
    const animals = await Animal.findByIdAndUpdate(req.params.id, newAnimalData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    }) 
})


exports.deleteAnimal = catchAsyncErrors(async (req, res, next) => {
    try{
    const animal = await Animal.findById(req.params.id);

    animal.animal_image.forEach(animal2 => {
        cloudinary.v2.uploader.destroy(animal2.public_id);
    })

    await animal.remove();

    res.status(200).json({
        success: true,
        message: 'Animal is deleted.'
    })
    }catch(err){
        res.status(400).json({
            message: "Animal not found"
        })
    }

})


exports.createAnimalComment = catchAsyncErrors(async (req, res, next) => {


    var commentss = swearjar.censor(req.body.comment); 

// console.log(req.params.id);
    const animal = await Animal.findByIdAndUpdate(req.params.id,{$push: {comment: {
                user_id: req.body.user_id, 
                comment: commentss,
            }}}, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

    const allcomments = animal.comment;

    res.status(200).json({
                success: true,
                animal, allcomments
            }) 

})

exports.createAdoptionRequest = catchAsyncErrors(async (req, res, next) => {

    console.log(req.params.id);

    const animal = await Animal.findByIdAndUpdate(req.params.id,{adoption_request: {
                user_id: req.body.user_id, 
                request_status: req.body.request_status,
                createdAt: new Date()
            }}, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

    res.status(200).json({
                success: true,
                animal
            }) 

})

exports.cancelAdoptionRequest = catchAsyncErrors(async (req, res, next) => {

    // console.log(req.params.id);

    const animal = await Animal.findByIdAndUpdate(req.params.id,{adoption_request: {
                $unset: { user_id:"",request_status: "", createdAt: "" }
            }}, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

    res.status(200).json({
                success: true,
                animal
            }) 

})

exports.AllAdoptionRequest = catchAsyncErrors(async (req, res, next) => {

    const animal_request = await Animal.find({'adoption_request.request_status' : 'pending'}).populate({ 
		path: 'adoption_request',
		populate: {
		  path: 'user_id',
		  model: 'User'
		} 
	 });


// console.log(animal, req.params.id);
    res.json({animal_request});

})

exports.AcceptAdoptionRequest = catchAsyncErrors(async (req, res, next) => {
    
    const animal = await Animal.findByIdAndUpdate(req.params.id,{
        $set: { 'adoption_status': 'adopted', 'adoption_request.request_status': req.body.request_status, 'adoption_request.createdAt': new Date() }
                }, 
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

    res.status(200).json({
                success: true,
                animal
            }) 

})