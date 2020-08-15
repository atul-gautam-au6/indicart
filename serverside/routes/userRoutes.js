import express from 'express'
import { registerroute, signinroute, adminroute } from '../controller/userController'
const router = express.Router()

router.post('/register',registerroute)

router.post('/signin',signinroute)




export default router;