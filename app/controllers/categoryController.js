const models = require("../../database/models");
const express = require('express');
const router = express.Router();


router.post('/createcategory', async (req,res) =>{
    console.log("ytyt",req.body ,)
    try{
        const category = await models.category.create({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
        image:req.body.image,
    });
    return res.status(201).json({
        category,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

router.get('/getcategories', async (req,res) =>{
   try {
    const categories = await models.category.findAll();
    return res.status(201).json(
        categories,
    );
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

router.get('/getcategory/:id',async (req,res) =>{
    const id = req.params.id;
    try{
        const category = await models.category.findByPk(id, {
        });
        console.log(323232,category)

        if(!category) {
            return res.status(500).json({
                error: `category can not be found`,
                success: false})
        } 
        res.status(200).json(category);
    } catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }
})

router.put('/updatecategory/:id',async(req,res) =>{
    const id = req.params.id;
    try{
        const category = await models.category.findByPk(id,{});
        if(!category){
            return res.status(500).json({
                message: 'category not found',
                success:false
            });
        }
        const updatedCategory = await models.category.update({
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
            image:req.body.image,
        }, {
            where: { id: id}
        });
        res.status(200).json(updatedCategory);

    }catch(err){
        res.status(500).json({
            error:err.message,
            success:false
        })
    }
})

router.delete('/deletecategory/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const category = await models.category.findByPk(id);
        console.log(category)
        if(!category) {
            return res.status(404).json({
                error: `category not found`,
                success: false})
        } 
        await category.destroy();
        return res.status(200).json({
            success: true,
            message: `Category deleted successfully`
          });
        } catch(err){
        res.status(500).json({
            error: err.message,
            success: false 
        });
    }
})

module.exports = router;