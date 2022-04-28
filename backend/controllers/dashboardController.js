const Animal = require('../models/animal')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user')

exports.getRescuedChart= catchAsyncErrors(async (req,res,next) => {
    console.log(req.body)
	
    const rescued_animaldate = await Animal.aggregate([{
        $match: {rescued_date: {
            $gte: new Date( req.body.rescued_start ),
            $lte: new Date( req.body.rescued_end )
        }}
    },
    {
        $group: {
            _id: {
               $month: "$rescued_date" 
            },
            Total: { $sum: 1 }
                }
            },
            { $sort: {
                '_id': 1, 
            } }
        ]);

    const adopted_animaldate = await Animal.aggregate([{
        $match: {
            $and:[
                {
                'adoption_request.createdAt': {
                    $gte: new Date( req.body.adopted_start ),
                    $lte: new Date( req.body.adopted_end )
                }
            }, {
                adoption_status: 'adopted'
            }, 
        ]
    }
    },
    {
        $group: {
            _id: {
               $month: "$adoption_request.createdAt" 
            },
            Total: { $sum: 1 }
                }
            },
            { $sort: {
                '_id': 1, 
            } }
        ]);    

        const total_animals = await Animal.find()
        const total_adopted= await Animal.find({'adoption_status': 'adopted'})
        const userss = await User.find({ role: 'adopter' });
        
        const total_animalsss = total_animals.length
        const total_adoptedss =total_adopted.length
        const userssss =  userss.length

        console.log(total_animalsss, total_adoptedss, userssss)

	res.status(200).json({
		success: true,
		rescued_animaldate, adopted_animaldate,total_animalsss, total_adoptedss, userssss
	})
})



