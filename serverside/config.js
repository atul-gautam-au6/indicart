import dotenv  from 'dotenv'
dotenv.config()
export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY||'@#$thisisaSecratekey';
    export const mongoURI=process.env.MONGODBURI ;
    // export const mongoURI= process.env.MONGODBURI_TEST;
    export const EMAIL=process.env.EMAIL;
    export const PASSWORD = process.env.PASSWORD
    // console.log(process.env.accessKeyId,process.env.secretAccessKey)
    export const accessKeyId = process.env.AWSAccessKeyId
    export const secretAccessKey = process.env.AWSSecretKey

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_RS //test id
// export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID_PRODUCTION //live id
