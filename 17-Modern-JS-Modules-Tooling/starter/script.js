// IMPORTING NAMED EXPORTS-----------------------------------
// import {addToCart, totalQuantity, tP as ttP} from './shoppingCart.js'
// console.log('Importing MOdule')
// console.log(addToCart('shoe', 10))

// console.log(totalQuantity,'quantity', ttP, 'price')

// IMPORTING ALL EXPORTS-----------------------------------
import * as ShoppersCart from './shoppingCart.js'
// console.log(ShoppersCart.tP)
// console.log(ShoppersCart.totalQuantity)
// ShoppersCart.addToCart('Fish', 20)
// console.log(ShoppersCart.cart)

// IMPORTING DEFAULT EXPORT---------------------------------
// import addCartFunc from './shoppingCart.js'
// addCartFunc('Wrapper', 4)

// IMPORTS ARE LIVE CONNECTION WITH EXPORTS---------------------------------
import add, {cart} from './shoppingCart.js'
// add('Wrapper', 4)
// add('Bread', 10)
// add('Shoe', 2)
// add('Clothe', 8)

// console.log(cart)

// TOP LEVEL AWAIT---------------------------------
// 1. It allowas the await keyword to be used outside of the async function
// 2. It blocks the latter code in a module, and other modules importing it

// MODULE PATTERNS (IMMEDIATELY INVOKED FUNCTIONS) POSSIBLE THROUGH CLOSURES---------------------------------

const shoppingCart2 = (function(){
  const shippingCost = 10
  const cart = []
  const totalPrice = 2400
  const totalQuantity = 23

  const addToCart = function(product, quantity){
    cart.push({product, quantity})
  //  console.log(`${quantity} ${product} added to cart. And the cost is ${shippingCost * quantity} naira`)
  }

  const orderStock = function(product, quantity){
    // console.log(`${quantity} ${product} are ordered from EniolaOluwa`)
  }

  return{
    addToCart,
    cart,
    totalPrice,
    totalQuantity
  }
})()

// shoppingCart2.addToCart('Apples', 3)
// shoppingCart2.addToCart('Mango', 22)
// shoppingCart2.addToCart('Oranges', 32)

// console.log(shoppingCart2.cart)
// console.log(shoppingCart2.totalPrice)
// console.log(shoppingCart2.totalQuantity)
// console.log(shoppingCart2.orderStock) //undefined
// console.log(shoppingCart2.shippingCost) //undefined


// NPM ---------------------------------
import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
// import cloneDeep from 'lodash-es'

const state = {
  cart: [
    {product: 'bread', quantity: 5},
    {product: 'wine', quantity: 5},
  ],
  user: {loggedIn: true}
}

// SHALLOW COPY: this does not make a deep clone, rather it only refers back to the memory where it is stored
// const stateClone1 = Object.assign(state)
// console.log(stateClone1.user.loggedIn, '----------- should be true here')

// // DEEP CLONE USING LODASH 
// const stateDeepClone = cloneDeep(state)
// console.log(stateDeepClone.user.loggedIn,' ++++++ should be true here')

// // changing user login state here
// state.user.loggedIn = false;

// // checking for final state after change
// console.log(stateDeepClone.user.loggedIn,' ++++++ should remain true here')
// console.log(stateClone1.user.loggedIn, '----------- should be false here')



// BUNDLING WITH PARCEL AND NPM SCRIPTS ----------------------
// if (module.hot) {
//   module.hot.accept()
// }
