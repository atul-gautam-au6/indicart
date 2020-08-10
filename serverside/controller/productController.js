import data from '../data.js';
module.exports={
    getProductsByID (req,res)  {
        const productId = req.params.id;
        const product = data.products.find(productitem=>productitem._id===productId)
        if(product){
            res.send(product)
        }
        else if(!product)
        res.status(404).send({msg:"product not found"})
    }
}