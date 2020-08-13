import express from 'express'
import { getProductsByID,homeScreenProduct } from '../controller/productController';

import ProductM  from '../Model/productModel'
const router = express.Router()

router.get('/products',homeScreenProduct)
router.get('/products/:id',getProductsByID)


router.post('/product',async(req,res)=>{
    const product = (req.body)
    console.log('alldata',{product})
    const products = new ProductM ({
        ...product
    })
    console.log(products)
    const newProduct = await products.save()
    if(newProduct){
        return res.status(201).send({msg:'new Product Created',data:newProduct})
        
    }
    return res.status(500).send({msg:'Error in creating Product'})
})





export default router;


