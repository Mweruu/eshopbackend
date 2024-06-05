const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const multer = require('multer')


const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type')
    if(isValid){
        uploadError=null
    }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const extension = FILE_TYPE_MAP[file.mimetype];
      const fileName = file.originalname.split(' ').join('-');
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })

router.post('/createproducts', uploadOptions.any(), async (req,res) =>{
    console.log("reqbody",req, req.body, req.files);
    // res.send(req.body);
    try{
        const category = await models.category.findByPk(req.body.categoryId);
        if(!category){
            return res.status(500).json({
                message:'categoryId not found',
                success:false
            })
        }
        const user = await models.user.findByPk(req.body.userId);
        if(!user){
            return res.status(500).json({
                message:'user not found',
                success:false
            })
        }

        let file = null;
        let files = [];
        let imagesPaths = [];
        let imagePath = '';
        let basePath;
        // if(env === 'production'){
        //     basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        // }else {
            basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        // }
        files = req.files
        file = files[0] || null;
        files.map((el) => {
            console.log("Data", el)
            imagesPaths.push(`${basePath}${el.filename}`);

        });
        if (!file) return res.status(400).send({message:'No image in the request'});
        imagePath = `${basePath}${file.filename}`;
        console.log(req.body)

        // const file = req.file;
        // if(!file) return res.status(400).send('No image in the request')
        // const fileName = req.file.filename
        // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        const product = await models.product.create({
            id: randomUUID(),
            userId:req.body.userId,
            categoryId:req.body.categoryId,
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            richDescription:req.body.richDescription,
            brand:req.body.brand,
            countInStock:req.body.countInStock,
            // rating:req.body.rating,
            image:imagePath,
            images:imagesPaths,
            // numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured,
    });
    console.log("proerjdfjd", product)
    return res.status(201).json({
        product,
    });
    } catch (error) {
    return res.status(500).json({
        success:false,
        error: error.message})
    }

});

router.get('/getproducts', async (req,res) =>{
   try {const products = await models.product.findAll({
    include:models.category
   });
    return res.status(201).json(
        products,
    );
}catch (error) {
    return res.status(500).json({error: error.message})
}
});

router.put('/updateproduct/:id', uploadOptions.any(),async(req,res) =>{
    const id =req.params.id
    try{
      const product = await models.product.findByPk(id, {});
     if(!product){
         return res.status(500).json({
             success:false,
             message:'product not found'
         });
     }
     const category = await models.category.findByPk(req.body.categoryId);
        if(!category){
            return res.status(500).json({
                message:'categoryId not found',
                success:false
            })
        }

    const user = await models.user.findByPk(req.body.userId);
        if(!user){
            return res.status(500).json({
                message:'user not found',
                success:false
            })
        }


    let file = null;
    let files = [];
    let imagesPaths = [];
    let imagePath = '';
    let basePath;
    // if(env === 'production'){
    //     basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    // }else {
    basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    // }
    console.log("files", req.files)
    files = req.files
    file = files[0] || null;
    files.map((el) => {
        console.log("Data", el)
        imagesPaths.push(`${basePath}${el.filename}`);

    });
    if (!file) return res.status(400).send({message:'No image in the request'});
    imagePath = `${basePath}${file.filename}`;
    console.log(req.body)

    
     const updatedProduct = await models.product.update({
        id: randomUUID(),
        userId:req.body.userId,
        categoryId:req.body.categoryId,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        richDescription:req.body.richDescription,
        brand:req.body.brand,
        countInStock:req.body.countInStock,
        // rating:req.body.rating,
        image:imagePath,
        images:imagesPaths,
        // numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured,
     },{
        where: { id: id}
    });
     console.log(updatedProduct)
     return res.status(201).json(updatedProduct);
     }catch(err){
         res.status(400).json({
             error: err.message,
             success: false 
         });
     }
});

router.get('/getproduct/:id', async (req,res) => {
    const id =req.params.id
    try{
        const product = await models.product.findByPk(id, {
            include:models.category

        });
    if(!product){
        return res.status(500).json({
            success:false,
            message:'product not found'
        });
    }
    res.status(200).json(product) 
    }catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }

});

// router.get('/getproducts/:categoryId', async (req,res) => {
//     // const categoryId = req.params.categoryId;
//     const categoryIds = req.params.categoryIds.split(',');

//     try{
//         const category = await models.category.findByPk(categoryId);
//         if(!category){
//             return res.status(500).json({
//                 message:'category not found',
//                 success:false
//             })
//         }

//         const products = await models.product.findAll(
//             { where:{categoryId}}
//         );
//         res.status(200).json(products);
//     }catch(err){
//         res.status(500).json({
//             error: err.message,
//             success: false  
//         });
//     }
// });

router.get('/getproducts/:categoryIds', async (req, res) => {
    const categoryIds = req.params.categoryIds.split(','); 
    try {
        const categories = await models.category.findAll({
            where: { id: categoryIds }
        });

        if (categories.length !== categoryIds.length) {
            return res.status(500).json({
                message: 'One or more categories not found',
                success: false
            });
        }

        const products = await models.product.findAll({
            where: { categoryId: categoryIds }
        });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
});



router.get('/getuserproducts/:userId', async (req,res) => {
    const userId = req.params.userId;
    try{
        const user = await models.category.findByPk(userId);
        if(!user){
            return res.status(500).json({
                message:'user not found',
                success:false
            })
        }

        const products = await models.product.findAll(
            { where:{userId}}
        );
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            error: err.message,
            success: false  
        });
    }
});

router.delete('/deleteproduct/:id', async (req,res) => {
    const id = req.params.id
    try{
        const product = await models.product.findByPk(id,{});
    if(!product){
        return res.status(500).json({
            success:false,
            message:'product not found'
        });
    }
    await product.destroy();
    return res.status(200).json({
        success: true,
        message: `Product deleted successfully`
      });
    }catch(err){
        res.status(400).json({
            error:err.message,
            success:false
        })
}
});

router.put('images/:id', uploadOptions.array('images', 10),async(req,res)=>{
    const id =req.params.id
      const product = await models.product.findByPk(id, {});
     if(!product){
         return res.status(500).json({
             success:false,
             message:'product not found'
         });}
     

    const files = req.files
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if(files){
        files.map(file =>{
            imagesPaths.push(`${file.fileName},${basePath}`)
        })
    }
    const updatedProduct = await models.product.update({
        images:imagesPaths,

    });
    return res.status(201).json(updatedProduct);

})



router.get('/productcount', async(req,res) =>{
    try{
        const productCount = await models.product.count()

        if(!productCount){
            res.status(500).json({success:false})
        }
        res.status(200).json({
            productCount:productCount
        });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error counting products'})
    }
})


module.exports = router;
