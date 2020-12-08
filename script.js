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


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//FUNCTIONS

const userNameCreator = function (acc) {
  acc.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
userNameCreator(accounts);

const displayMovements = function (acc) {
  containerMovements.innerHTML = '';
  acc.movements.forEach(function (mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1}</div>
        <div class="movements__value">${mov}</div>
      </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.innerHTML = `${acc.balance}€`;
}
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`
  const withdrawals = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc - mov, 0)
  labelSumOut.textContent = `${withdrawals}€`
  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * (acc.interestRate / 100)).filter((int, i, arr) => int >= 1).reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = `${interest}€`
}

//EVENT HANDLERS
let currentAccount;

let displayHandler = function (acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
}

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}`
    containerApp.style.opacity = 100;
    // clear input field
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();
    inputLoginUsername.blur();
    displayHandler(currentAccount)
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.userName === inputTransferTo.value);
  if (amount > 0 && receiverAccount && currentAccount.balance >= amount && receiverAccount?.userName !== currentAccount.userName) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    displayHandler(currentAccount)
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();

  }
  else {
    console.log("transfer invalid");
  }
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const euToUSD = 1.1;
// /////////////////////////////////////////////////
// const movementsUSD = movements.map(mov => mov * euToUSD)
// const movementsDescriptions = movements.map((mov, i, arr) => {
//   let result = mov > 0 ? `Movement ${i + 1}:\n You deposited ${mov}` : `Movement ${i + 1}:\n You withdrew ${Math.abs(mov)}`
//   return result;
// })
// console.log(movementsDescriptions);

// // Jonas Schmedtmann



// const USDmovements = movements.filter(mov => mov > 0).map(mov => mov * euToUSD).reduce((acc, mov) => acc + mov, 0)