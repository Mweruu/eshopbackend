const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createorderitem', async (req,res) => {
    try {
        console.log(req.body)
        const dateOrdered = new Date();
        const orderItem = await models.orderItem.create({
            productId:req.body.productId,
            orderId:req.body.orderId,
            userId:req.body.userId,
            quantity:req.body.quantity,
            dateOrdered:dateOrdered,
       
        });

        const user = await models.user.findByPk(req.body.userId);
            if(!user){
                return res.status(500).json({
                    message:'user not found',
                    success:false
                })
            }
        return res.status(201).json({
            orderItem,
        });
    } catch (error) {
    return res.status(500).json({error: error.message})
    } 
});

router.get('/getorderitems', async (req,res) => {
    try {
        const orderItem = await models.orderItem.findAll({
            // include:models.user
        });
        return res.status(201).json(
            orderItem,
        );
    }catch (error) {
        return res.status(500).json({error: error.message})
    }
 
});

router.get('/getorderitem/:orderId', async (req,res) => {
    const orderId = req.params.orderId;
    console.log("orderid", orderId)
    try{
        const orderItem = await models.order.findByPk(orderId,{
            // include:models.user,
            // include:models.product
        });
        if(!orderItem){
            return res.status(500).json({
                message:'order not found',
                success:false,
            });
        }
        res.status(200).json(orderItem);
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        });
    }
});


module.exports = router
