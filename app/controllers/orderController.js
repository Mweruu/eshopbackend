const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createorder', async (req,res) => {
    try {
        const dateOrdered = new Date();
    const order = await models.order.create({
        userId:req.body.userId,
        productId:req.body.productId,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        dateOrdered:dateOrdered,
       
    });
    return res.status(201).json({
        order,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    } 
});

router.patch('/getorders', async (req,res) => {
    try {
        const orders = await models.order.findAll({
            include: [models.user, models.orderItem]
        });
        return res.status(201).json(
            orders,
        );
    }catch (error) {
        return res.status(500).json({error: error.message})
    }
 
});

router.get('/getorder/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const order = await models.order.findByPk(id,{
            include:[ models.user, models.orderItem ]
        });
        if(!order){
            return res.status(500).json({
                message:'order not found',
                success:false,
            });
        }
        res.status(200).json(order);
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        });
    }
});

router.get('/getorders/:userId', async (req,res) => {
    const userId = req.params.userId;
    try{
        const user = await models.user.findByPk(userId,{});
        if(!user){
            return res.status(500).json({
                message:'user not found',
                success:false,
            });
        }

        const order = await models.order.findAll({
            where:{userId}
        })
        res.status(200).json(order)
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        });
    }
});

router.put('/updateorder/:id', async (req,res) =>{
    const id = req.params.id;
    try{
        const order = await models.order.findByPk(id,{});
        if(!order){
            return res.status(500).json({
                message:'order does not exist',
                success:false
            });
        }
        const dateOrdered = new Date();
        const updatedOrder = await models.order.update({
            userId:req.body.userId,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:req.body.totalPrice,
            dateOrdered:dateOrdered,        
        },{
                where: { id: id}
            });
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json({
            error:err.message,
            success:false
    })
    }
})

router.delete('/deleteorder/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const order = await models.order.findByPk(id,{});
        if(!order){
            return res.status(500).json({
                message:'order not found',
                success:false,
            });
        }
        await order.destroy();
        return res.status(200).json({
            success: true,
            message: `Order deleted successfully`
          });
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        });
    }
});

module.exports = router
