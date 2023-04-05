'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// code
// calculate income, withdrawal, and interest
const calcSummary = function(account){
  // withdrawals
  const spent = account.movements.filter(eachMov => eachMov < 0)
  .reduce((totalSpent, currentSpent) => totalSpent + currentSpent, 0)
  labelSumOut.textContent = `${spent}€`

   // deposits
  const income = account.movements.filter(eachMov => eachMov > 0)
  .reduce((totalIncome, currentIncome) => totalIncome + currentIncome, 0)
  labelSumIn.textContent = `${income}€`
  
  // interest
  const interest = account.movements
  .filter(eachMov => eachMov > 0)
  .map(deposit => (deposit * account.interestRate) / 100)
  .filter(int => int >= 1 )
  .reduce((acc, curr) => acc + curr, 0)
  labelSumInterest.textContent = `${interest}€`
}

// calculate the balance
const movBalance = function(account){
  account.balance = account.movements.reduce((total, currentValue) => total + currentValue, 0)
  labelBalance.textContent = `${account.balance} €`
}

// display transactions
const displayMovements = function(movements){
  containerMovements.innerHTML ='';

  movements.map((eachMov, i) => {
    const type = eachMov > 0 ? 'deposit' : 'withdrawal';
    
    const html = `<div class="movements__row">
                  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                  <div class="movements__date">3 days ago</div>
                  <div class="movements__value">${eachMov}€</div>
                </div>
    `
    containerMovements.insertAdjacentHTML("afterbegin", html);
  })
}
displayMovements(account1.movements)

// creating username
const userNames = account => {
  account.userName = account.owner.toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('')
  // console.log(account, account.userName)
}
accounts.forEach(acc => userNames(acc))

// implementing login function
let currentUser;
const implementingLogin = function(e){
  e.preventDefault()

  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value)
  console.log(currentUser)

  if(currentUser?.pin === Number(inputLoginPin.value)){
    // change welcome tag && display ui
    labelWelcome.textContent = `Welcome back, ${currentUser.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100

    // // display movements
    // displayMovements(currentUser.movements)

    // // display balance
    // movBalance(currentUser)

    // // display summaries
    // calcSummary(currentUser)

    updateUI(currentUser)
    
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur()
}

const updateUI = function(account){
  displayMovements(account.movements)
  calcSummary(account)
  movBalance(account)
}

// event handlers
btnLogin.addEventListener('click', implementingLogin)

// implementing transfer
let receipient;

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  let transferAmount = inputTransferAmount.value;
  let receipient = accounts.find(acc => acc.userName === inputTransferTo.value)

  // 1. check for the balance of the sender
          if (
            currentUser.balance >= transferAmount &&
            transferAmount > 0 &&
            receipient &&
            receipient?.userName !== currentUser.userName
          ){
            // 2. add negative to the sender's account
            currentUser?.movements.push(Number(-transferAmount))
            updateUI(currentUser)

            // 3. add positive to the receipient's account
            
            receipient?.movements.push(Number(transferAmount))

            inputTransferTo.value = inputTransferAmount.value =''
            inputTransferAmount.blur()
          }
          

  
  // 3. update ui
})





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movDescriptions = movements.map((mov, i) => {
  const type = mov > 0 ? 'deposited' : 'withdrew';
  return `Movement${i + 1}: You ${type} ${Math.abs(mov)}`
})

// console.log(movDescriptions)
/////////////////////////////////////////////////
