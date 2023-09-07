const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv/config');
const cors = require("cors");

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const api = process.env.API_URL;
const productRouter = require('./app/controllers/productController');
const categoryRouter = require('./app/controllers/categoryController');
const userRouter = require('./app/controllers/userController');
const orderRouter = require('./app/controllers/orderController');

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
// app.use(authJwt);
// app.use(errorHandler);


app.use(`${api}`, productRouter);
app.use(`${api}`, categoryRouter);
app.use(`${api}`, userRouter);
app.use(`${api}`, orderRouter);

app.use(express.urlencoded({ extended: true }));

 
app.get('/', (req,res) =>{
    // res.send('Hello')
    res.json({ message: "Welcome to eshop application." });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server  is running on port ${PORT}`);
})