import { CART_SAVE_SHIPPIN, CART_SAVE_PAYMENT } from "../actionType";

export const saveshipping = (data) =>(dispatch)=>{
    dispatch({type:CART_SAVE_SHIPPIN,payload:data})
}
export const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }


