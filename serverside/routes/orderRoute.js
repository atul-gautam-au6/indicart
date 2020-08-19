import express from 'express'
import Order from '../Model/orderModel'
import { isAuth } from '../utils';
const router = express.Router()

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

export default router;