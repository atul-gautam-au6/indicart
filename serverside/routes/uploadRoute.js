import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import config from '../config'

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
  const upload = multer({ storage });
  
  const router = express.Router();
  router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
  });


export default router;