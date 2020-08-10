import express from 'express'
import { getProductsByID } from '../controller/productController';


const router = express.Router()

router.get('/api/products/:id',getProductsByID)





export default router;


