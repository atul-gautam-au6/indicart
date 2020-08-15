import data from '../data.js';
import productmodel from '../Model/productModel'

module.exports={
   async homeScreenProduct (req,res){
    const {category,page,perPage,limit} = req.query
    // console.log(category)
    const option = {
        page:parseInt(page,10)||1,
        limit:parseInt(perPage,12)||12
    }
    function escapeRegex(category) {
        var name = category || '';
        return name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const regex = new RegExp(escapeRegex(category), 'gi');
    const productroute = await  productmodel.paginate({category:regex||''},option)
   return  res.send(productroute.docs)
    },


     async getProductsByID (req,res)  {
        const productId = req.params.id;
        const product = await productmodel.findOne({_id:productId})
        if(product){
           return res.send(product)
        }
        else if(!product)
       return res.status(404).send({msg:"product not found"})
    }
}