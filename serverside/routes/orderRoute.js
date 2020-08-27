import express from 'express'
import Order from '../Model/orderModel'
import { isAuth, isAdmin } from '../utils';
import { EMAIL, PASSWORD } from '../config';
import nodemailer from 'nodemailer'
const router = express.Router()

router.get('/',isAuth,async(req,res)=>{
    const orders = await Order.find({}).populate('user')
    // console.log(orders)
    res.send(orders)
})
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });

router.get('/:id',isAuth,async(req,res)=>{
    const orders = await Order.findOne({ _id: req.params.id })

    if(orders){
        res.send(orders)
    }
    else{
        res.status(404).send("Order Not Found.")
    }
})

router.put('/:id/pay',isAuth,async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.payment={
            paymentMethod:'paypal',
            paymentResult:{
                payerID:req.body.payerID,
                orderID:req.body.paymentID,
                paymentID: req.body.paymentID
            }
        }
        const updateOrder = await order.save()
        res.send({msg:'order paid',order:updateOrder})
    }
    else {
        res.status(404).send({msg:'order not found'})
    }
})
router.post('/confirm',isAuth,async(req,res)=>{
    try {
        const {isPaid} = req.body.order;
        if(!isPaid){
            return res.send('your payment failled')
        }
        
        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:EMAIL,
                pass:PASSWORD                    
            }
        })
        const { response}=  await transport.sendMail({
            to:NewUser.email,
            subject:'Indicart Order-Success-Email',
            html:`
            
                    <h2>Indicart-shopping</h2>
                    <p>thanks for shopping to indicart</p>
                   <ul>
                        <li>orderId: ${req.body.order._id} </li>
                        <li>Shipping address: ${req.body.order.shipping.address}  ${req.body.order.shipping.city} ${req.body.order.shipping.postelCode} ${req.body.order.shipping.country}</li>
                        <li>your Product: ${req.body.order.orderItems.name} (${req.body.order.orderItems.qty}) </li>
                        <li>Payment Method: ${req.body.order.payment.paymentMethod}</li>
                        <li>totalPrice: ${req.body.order.totalprice}</li>
                   </ul>
            `
        })
        if(response){
            console.log('working...')
            return res.send({msg:'user registration success',newuser:NewUser})
        }

    } catch (error) {
        console.log('email-conform-error',error.message)
    }
})

export default router;