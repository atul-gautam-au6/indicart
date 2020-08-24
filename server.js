import express from 'express';
// import dotenv from 'dotenv'
// dotenv.config()
// import data from './serverside/data.js';
import userRoute from './serverside/routes/userRoutes'
import productRoute from './serverside/routes/productroute'
import orderRoute from './serverside/routes/orderRoute'
import db from './serverside/db';
import bodyParser from 'body-parser'
import { PAYPAL_CLIENT_ID } from './serverside/config';


const app = express()
app.use(bodyParser.json())
// console.log(process.env.JWT_SECRET_KEY)
app.use('/api',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)
app.get('/api/config/paypal', (req, res) => {
    // console.log(PAYPAL_CLIENT_ID)
    res.send(PAYPAL_CLIENT_ID);
  });


if(process.env.NODE_EVR==='production'){
    app.use(express.static('../clienside/build'))
}

app.listen(8082,()=>{
    console.log('server running at port number '+ 8082)
})