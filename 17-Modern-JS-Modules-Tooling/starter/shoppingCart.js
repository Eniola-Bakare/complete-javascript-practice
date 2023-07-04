console.log('Exporting Module')


// // TOP LEVEL AWAIT---------------------------------
let arr = []
  console.log('Fetch Begins')

  await fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .then(data => console.log(data.slice(-1)[0].name))
    
  console.log('Fetch ends')

// EXPORTING MODULES -------------------------------------
const shoppingPrice = 10
export const cart = []

export const addToCart = function(product, quantity){
  cart.push({product, quantity})
 console.log(`${quantity} ${product} added to cart. And the cost is ${shoppingPrice * quantity} naira`)
}

const totalPrice = 243
const totalQuantity = 10

export {totalPrice as tP, totalQuantity}

export default  function(product, quantity){
  cart.push({product, quantity})
 console.log(`${quantity} ${product} added to cart. And the cost is ${shoppingPrice * quantity} naira`)
}
