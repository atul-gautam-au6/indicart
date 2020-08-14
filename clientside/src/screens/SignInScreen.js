import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import    {signin, registerinwithGoogle }   from '../action/userAction';
import GoogleLogin from 'react-google-login';
import facebookLogin from 'react-facebook-login'
import Axios from 'axios';

const SignScreens = (props) => {
   const [email,setEmail] = useState('')
   const [response,setResponse]=useState('')
   const [password,setPassword] = useState('')
   const userSignin = useSelector(state=>state.userSignin)
   const {loading,userInfo,error} = userSignin
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'


        //Google-Login
    const [name,setName] = useState('')
    const [emaildata,setEmaildata] = useState('')
    const [tokenid,setTokenid] = useState('')
    const [googleid,setGoogleId]=useState('')

    const responseGoogle=async(response)=>{
        // console.log(response)
        setName(response.profileObj.name)
        setEmaildata(response.profileObj.email)
        setTokenid(response.tokenId)
        setGoogleId(response.googleId)
        const { data}= await Axios.post('/api/users/register',{tokenId:response.tokenId})
        // console.log(data)
        // if(data){
        //     props.history.push(redirect)
        // }
    }
    //     useEffect(async() => {                
    //     return () => {
    //         // cleanup
    //     }
    // }, [])




    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
        return () => {
            //cleanup
        }
    }, [userInfo ])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signin(email,password))
    }
    
    // registerinwithGoogle(dispatch(name,emaildata,tokenid,googleid))
    return (
        <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Sign-in</h2>
                    </li>
                    <li>
                        {/* {
                                data &&<div>{data.data}</div>
                        } */}
                        {
                            loading && <img src='/image/giiflogo.gif' />
                        }
                        {
                            error && <div>{error}</div>
                        }
                    </li>
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} />

                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />

                    </li>
                    <li>
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        <GoogleLogin 
                        className="button"
                            clientId="485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"
                            // buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}  
                                                   
                        />
                    </li>
                    {/* <li>
                        <facebookLogin 
                            
                        />
                    </li> */}
                   
                    <li>
                        New to User
                    </li>
                    <li>
                        <Link to={redirect=='/' ? "register" :"register?redirect=" + redirect} className="button text-center secondary">Create your account</Link>
                    </li>
                </ul>
           </form>
        </div>
            
    )
}

export default SignScreens




