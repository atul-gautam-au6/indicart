import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter,Route, Link} from "react-router-dom"
import HomeScreen from './screens/HomeScreen'
import productScreen from './screens/ProductScreens'
import CartScreen from './screens/CartScreen';
import SignScreens from './screens/SignInScreen';
import Registerscreen from './screens/Registerscreen';
import { useSelector, useDispatch } from 'react-redux';
import Shoppingcreen from './screens/Shoppingcreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductcreateScreen from './screens/ProductcreateScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import { FormGroup, FormControlLabel, Switch, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme)=>({
  root:{
    flexGrow:1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function App() { 
  const classes = useStyles()
  const userSignin = useSelector(state=>state.userSignin)
  // getAccessTokenFromCode()
  const {userInfo} = userSignin
  // console.log(userInfo)
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  
  
 
  return (
    <BrowserRouter>
    <div className="grid-container" >
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/" className="logo">Indi cart &#174;</Link>
          
        </div>
        <div className="header-links">
            <a href="cart.html">Cart</a>
            {
              userInfo ? <Link to='/profile'>{userInfo.name}</Link>: 
              <Link to="/signin">Signin</Link>
            }
            
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/product">Products</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
    </header>
    


    <aside className="sidebar">
         <h3>Shopping Categories</h3>
         <button className="sidebar-close-button" onClick={closeMenu}>X</button>
         <ul>
             <li>
                 <a href="index.html">Pants</a>
             </li>
             <li>
                 <a href="index.html">Pants</a>
             </li>
         </ul>
    </aside>
    
    <main className="main">
       <div className="content">
         <Route exact={true} path='/orders' component={OrdersScreen} /> 
         <Route exact={true} path='/order/:id' component={OrderScreen} />
         <Route exact={true} path='/profile' component={ProfileScreen} />
         <Route exact={true} path='/register' component={Registerscreen} />
         <Route exact={true} path="/product" component={ProductcreateScreen} />
         <Route exact={true} path='/payment' component={PaymentScreen} />
         <Route exact={true} path='/shipping' component={Shoppingcreen} />
         <Route exact={true} path='/placeorder' component={PlaceOrderScreen} />
         <Route exact={true} path="/signin" component={SignScreens} />
         <Route exact={true} path="/products/:id" component={productScreen} />
         <Route exact={true} path="/cart/:id?" component={CartScreen} />
         <Route exact={true} path="/" component={HomeScreen} />
       </div>
    </main>
    <footer className="footer">
      &copy; All Right Reserved &reg;
    </footer>
</div>
</BrowserRouter>
  );
  
  }
export default App;
