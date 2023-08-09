import React, { createContext, useContext, useReducer, useState } from "react";
import './App.css';

const prodCtx = createContext(null);
const initialState = { product: 0, cart: 0, price: 5000, totalCost: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add-cart":
      return {
        ...state,
        cart: state.cart + 1,
        totalCost: state.totalCost + state.price
      };
    case "remove-cart":
      return { 
        ...state, 
        cart: state.cart - 1,
        totalCost: state.totalCost - state.price 
      };
    case "buy-now":
      return {
        ...state,
        product: state.product - state.cart,
        cart: 0,
        totalCost: 0
      };
    case "restore":
      return { ...state, 
        product: 25 
      };

    // 'action.payload' is a separate object & its value is set for the other object 'price'
    case "set-price":
      return { ...state, 
        price: + action.payload 
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [product, setProduct] = useState(0);
  // const [cart, setCart] = useState(0);
  return (
    <div className="App">
      <prodCtx.Provider
        value={{
          state,
          dispatch
        }}
      >
        <ShopComp />
      </prodCtx.Provider>
      <br />
    </div>
  );
}

function ShopComp() {
  return (
    <div>
      <Admin />
      <br />
      <div className="user-inferface">
        <Product />
        <Cart />
      </div>
      <br />
      <CostOfPurchase />
    </div>
  );
}

function Admin() {
  const { state, dispatch } = useContext(prodCtx);
  const [priceValue, setPriceValue] = useState(state.price);
  //const [priceValue, setPriceValue] = useState(0);    //sets initial price 'zero'
  return (
    <div>
      <h1>Admin</h1>
      <input
        type="number"
        placeholder="Enter Product Price"
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
      />

      {/* creating a new object payload(key) & priceValue(value) inside action */}
      {/* if multiple objects needed we can set using comma(,) */}
      <button
        onClick={() => dispatch({ type: "set-price", payload: priceValue })}
      >
        Set-Price
      </button>
      <button onClick={() => dispatch({ type: "restore" })}>
        Restore product
      </button>
    </div>
  );
}

function Product() {
  const { state, dispatch } = useContext(prodCtx);
  return (
    <div className="prod-info">
      <h5>PRODUCT</h5>
      <img
        src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw90e0e870/Category-Landing/Category-Mobile/Mens-New/Mobile_Men_Casual_Sneakers.jpg?sw=780"
        alt="product-name"
      />
      <h3>Sketchers</h3>
      <p>Left : {state.product}</p>
      <p>Price : {state.price}</p>
      <button onClick={() => dispatch({ type: "add-cart" })}>
        Add to cart
      </button>
    </div>
  );
}

function Cart() {
  const { state, dispatch } = useContext(prodCtx);
  return (
    <div className="prod-info">
      <h5>CART</h5>
      <img
        src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw90e0e870/Category-Landing/Category-Mobile/Mens-New/Mobile_Men_Casual_Sneakers.jpg?sw=780"
        alt="product-name"
      />
      <h3>Sketchers</h3>
      <p>
        No of Items : {state.cart}{" "}
        <button onClick={() => dispatch({ type: "add-cart" })}>+</button>
        <button onClick={() => dispatch({ type: "remove-cart" })}>-</button>
      </p>
      <button onClick={() => dispatch({ type: "buy-now" })}>Buy now</button>
    </div>
  );
}

function CostOfPurchase() {
  const { state } = useContext(prodCtx);
  return <div className="prod-info">Total cost {state.totalCost}</div>;
}


//useReducer
//to avoid using more number of useStates
//debugging and modifications will be easier

// //in-built working
// function ourReducer(reducer, reducerState){
//   function dispatch(action){
//     reducer(reducerState, action)      //given reducer function is called here
//   }
//   return [reducerState, dispatch]
// }

// //reducer functionality
// function reducer(state, action){
//   switch(action.type){
//     case "buy-one":
//       return console.log("buy one reducer triggered", state.order-1)
//       case "buy-two":
//         return console.log("buy two reducer triggered", state.order-2)
//         return
//       }
//     }
//     const initialState = {order:20, rawmateral:19}
        
//     const [state, dispatch]= ourReducer(reducer, initialState)
//     console.log(state)
//     console.log(state.order)
//     dispatch({type:"buy-one"})
//     dispatch({type:"buy-two"})


// //Switch Case Object
// //all cases must be of same data type
// function checkDetails(action){
//   switch(action.type){
//     case "say-fname":
//       return console.log("The f-name is Ajay")
//     case "say-lname":
//       return console.log("The l-name is Karthik")
//     default :
//       return console.log("Hello World")
//   }
// }

// const actiondata = {
//   type : "say-fname"
// }
// checkDetails(actiondata)

// //Switch Case String
// //all cases must be of same data type
// function checkDetails(name){
//   switch(name){
//     case "Ajay":
//       return console.log("given name is a first name")
//     case "Karthik":
//       return console.log("given name is a last name")
//     default :
//       return console.log("Hello World")
//   }
// }

// const data = "Ajay"
// checkDetails(data)



// //action is an array of objects
// var action = [
//   {type : {addcart : {state : { 
//     product: 0, 
//     cart: 0, 
//     price: 5000, 
//     totalCost: 0 
//   }}}},
//   {type : {removecart : {state : { product: 0, cart: 0, price: 5000, totalCost: 0 }}}},
//   {type : {buynow : {state : { product: 0, cart: 0, price: 5000, totalCost: 0 }}}},
//   {type : {restore : {state : { product: 0, cart: 0, price: 5000, totalCost: 0 }}}},
//   {type : {setprice : {state : { product: 0, cart: 0, price: 5000, totalCost: 0 }}}},

//   {payload : priceValue}
// ]