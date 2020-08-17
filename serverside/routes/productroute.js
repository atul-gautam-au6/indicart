import express from 'express'
import { getProductsByID,homeScreenProduct } from '../controller/productController';
import Order from '../Model/orderModel'
import ProductM  from '../Model/productModel'
import { isAuth, isAdmin } from '../utils';
const router = express.Router()

router.get('/products',homeScreenProduct)
router.get('/products/:id',getProductsByID)


router.post('/product',isAuth,isAdmin,async(req,res)=>{
    const product  = new ProductM({
            name:req.body.name,
            category:req.body.category,
            brand:req.body.brand,
            Mrp:req.body.Mrp,
            price:req.body.price,
            offers:req.body.offers,
            image:req.body.image,
            countInStack:req.body.countInStack,
            description:req.body.description

    })
    const newProduct =await product.save()
    if(newProduct){
        return res
            .status(201)
            .send({msg:'New Product Created',data:newProduct})
    }
    return res.status(500).send('Error in Creating Product')
    
})

router.get('/orders/mine/',async(req,res)=>{
    console.log('hello its aworking')
    console.log(req.params)
    const orders = await Order.findOne({user:req.params.id})
    res.send(orders)
})
router.delete('/products/:id',isAuth,isAdmin,async(req,res)=>{
    const deleteProduct = await ProductM.findById(req.params.id)
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({msg:'product deleted'})
    }else {
        res.send('Error in deletion')
    }
})
router.put('/product/:id',isAuth,isAdmin,async(req,res)=>{
    const  productId = req.params.id;
    const product = await ProductM.findById(productId)
    if(product){
        product.name=req.body.name,
        product.category=req.body.category,
        product.brand=req.body.brand,
        product.Mrp=req.body.Mrp,
        product.price=req.body.price,
        product.offers=req.body.offers,
        product.image = req.body.image,
        product.countInStack=req.body.countInStack,
        product.description=req.body.description
        const updatedProduct = await product.save()
        if(updatedProduct){
            return res
            .status(200)
            .send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
})



export default router;


