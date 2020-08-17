import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, update } from '../action/userAction'
// import { Link } from 'react-router-dom';
import { listMyOrders } from '../action/Orderaction';
const ProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const userSignin = useSelector(state =>state.userSignin)
    const {userInfo} = userSignin
    // console.log(userInfo.id)

    const handleLogout = (e) =>{
        dispatch(logout())
        props.history.push('/signin')
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        // console.log({userId:userInfo._id})
        dispatch(update({userId:userInfo.id,email,name,password}))        
    }
    const userUpdate = useSelector(state => state.userUpdate);
        const {loading,success,error} = userUpdate

    const myOrderList = useSelector(state =>state.myOrderList)
    const {loading:loadingOrders,orders,error:errorOrders} = myOrderList
    console.log(orders)
    
    // eslint-disable-next-line
    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        return()=>{
        }
    },[userInfo])

    return (
        <>
        <div className="profile">
            <div className="profile-info">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>User profile</h2>
                        </li>
                        <li>
                            {loading&&<div>loading...</div>}
                            {error&&<div>{error}</div>}
                            {success&&<div>Profile saved successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input value={name} type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" email="email" id="email" onChange={(e)=>setEmail(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" password="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="primary button" >Update</button>
                        </li>
                        <li>
                            <button className='button primary' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div className='profile-orders content-margined'>
            {
                loadingOrders ? <div>Loading...</div> :
                errorOrders ? <div>{errorOrders}</div> :
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {orders.map(order=> <tr key={order._id}>
                        <td>{order.createAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid}</td>
                            
                        <td>
                            <Link to={"/order/"+order._id}>Details</Link>
                        </td>
                        </tr>
                                        
                        )} */}
                        
                    </tbody>
                </table>
            }
        </div>
    </>)
}

export default ProfileScreen
