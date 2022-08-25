const router = require('express').Router();

const { default: mongoose } = require('mongoose');
const Category = require('../model/Category');


router.get('/', async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.json({"Categories":categories});
        
    } catch (error) {
        res.json({"err":error});
    }
});

// create categories 
router.post('/create/category',async (req,res)=>{
    const category = new Category({
        name : req.body.name,
        description : req.body.description
    })

    const newCategory = await category.save();

    res.json({"status":201,"category":newCategory});

})

module.exports = router;