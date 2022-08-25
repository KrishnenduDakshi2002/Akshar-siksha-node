const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../model/User');
const Contribution = require('../model/Contibution');
const { default: mongoose } = require('mongoose');
const Category = require('../model/Category');

router.get('/search', async(req,res)=>{
    const category_id = mongoose.Types.ObjectId(req.query.category_id);
    let priceQuery = {};
    if(req.query.isFree){
        priceQuery  = {
            $match :{
                price :{
                    $eq : 0
                }
            }
        }
    }
    else{
        priceQuery = {
            $match :{
                price:{
                    $gt : 0
                }
            }
        }
    }

        const response = await Contribution.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [
                            +req.query.lng,
                            +req.query.lat
                        ]
                    },
                    distanceField: 'dist.calculated',
                    // maxDistance: 400000000,
                    query: {
                        category: category_id
                    },
                    includeLocs: 'dist.location',
                    spherical: true
                }
            },
            priceQuery,
            {
                $match:{
                    category : {
                        $eq : category_id
                    }
                }
            }
        ])

    
        res.json({'Contributions':response});
   

    
    
})

router.post('/add/contribution', verify, async (req,res)=>{
    const user_id = mongoose.Types.ObjectId(req.user._id);
    const category_id = mongoose.Types.ObjectId(req.body.category);

    try {

        const contribution = new Contribution({
            category : category_id,
            title : req.body.title,
            description : req.body.description,
            user : user_id,
            price : parseFloat(req.body.price),
            location : req.body.location
        });
    
        const newContribution = await contribution.save();

        res.json({"status":201,"contribution":newContribution});
        
    } catch (error) {
        res.json({"status":400,"error":error});
    }

    

})


module.exports = router;