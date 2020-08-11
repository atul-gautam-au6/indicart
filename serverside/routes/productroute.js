import express from 'express'
import { getProductsByID,homeScreenProduct } from '../controller/productController';


const router = express.Router()

router.get('/api/products/:id',getProductsByID)
router.get('/api/products',homeScreenProduct)





export default router;


