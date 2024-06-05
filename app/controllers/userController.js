const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createuser', async (req,res) =>{
    try{
        const user = await models.user.create({
            name:req.body.name,
            email:req.body.email,
            passwordHash:bycrypt.hashSync(req.body.password, 10),
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            apartment:req.body.apartment,
            city:req.body.city,
            zip:req.body.zip,
            street:req.body.street,
            country:req.body.country,
           

    });
    return res.status(201).json({
        user,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

router.post('/login', async (req, res) => {
    try{
        const user = await models.user.findOne({ where: { email: req.body.email }});
        if(!user){
            return res.status(400).json({
                error: `User not found`,
                success: false})
        }
        // if(!user.confirmed){
        //     throw new Error('Please confirm your email to login');
        // }
        if(user && bycrypt.compareSync(req.body.password, user.passwordHash)){
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d'}
            )
            res.send({  message: 'User Authenticated',
                        user:user.email,
                        token,
                        success: true });
        }else {
            res.send({ message: 'Wrong credentials, confirm password/email',
                        success: false });
        }
    }catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }
  })

router.get('/getusers', async (req,res) =>{
   try {
    const users = await models.user.findAll({
        // to fetch all users and exclude the passwordHash field from the query results.
        attributes: { exclude: ['passwordHash'] }
    });
    return res.status(201).json(
        users,
    );
}catch (error) {
    return res.status(500).json({error: error.message})
}
});

router.get('/getuser/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id,{
            attributes: { exclude: ['passwordHash'] }

        });
        if(!user){
            return res.status(500).json({
                success:false,
                message:'user not found'
            });
        }
        res.status(200).json(user)
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
}
});

router.put('/updateuser/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id, {});
        if(!user){
           return res.status(500).json({ 
            message:'user not found',
            success:false});
        }
        let newPassword
        if(req.body.password){
            newPassword = bycrypt.hashSync(req.body.password, 10)
        }else{
            newPassword = user.passwordHash
        }


        const updatedUser = await models.user.update({
            name:req.body.name,
            email:req.body.email,
            passwordHash:newPassword,
            street:req.body.street,
            apartment:req.body.apartment,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,      
          },{
            where: { id: id}
        })
        res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json({
        error:err.message,
        success:false
    });

    
}

});

router.delete('/deleteuser/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id,{});
        if(!user){
            return res.status(500).json({
                success:false,
                message:'user not found'
            });
        }
        await user.destroy();
        return res.status(200).json({
            success: true,
            message: `User deleted successfully`
          });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
}
});

router.get('/usercount', async(req,res) =>{
    try{
        const userCount = await models.user.count()

        if(!userCount){
            res.status(500).json({success:false})
        }
        res.status(200).json({
            userCount:userCount
        });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error counting users'})
    }
})

// router.get('/usercount', async (req, res) => {
//     try {
//       const userCount = await models.user.count();
  
//       if (userCount === null) {
//         return res.status(500).json({ success: false });
//       }
  
//       res.status(200).json({
//         userCount: userCount,
//         success: true
//       });
//     } catch (error) {
//       console.error('Error counting users:', error);
//       res.status(500).json({ success: false, error: 'Error counting users' });
//     }
//   });

module.exports = router
