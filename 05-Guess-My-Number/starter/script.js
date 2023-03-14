'use strict';

// let body = document.querySelector(body)
const againBtn = document.querySelector('.again')
let secretNumber = document.querySelector('.number')

const checkBtn = document.querySelector('.check')
let message = document.querySelector('.message')
let score = document.querySelector('.score')

// enerate a random number between 1 and 20
let randomNo = Math.trunc(Math.random() * 20 ) + 1


// ADDING EVENT LISTENER
let currentScore = 20
let highScore = 0

const messageText = function (messages) {
  message.textContent = messages
}

checkBtn.addEventListener('click',
  function(){
    let inputNumber =Number(document.querySelector('.guess').value)
    
    
    if(inputNumber === 0){
      messageText('⛔️ No number!')

    } else if (inputNumber === randomNo){
      const body = document.querySelector('body')
      body.style.backgroundColor = '#60b347'
      secretNumber.style.width = '30rem'
      messageText('🎉 Correct Number!!!')
      secretNumber.textContent = randomNo

      if (currentScore > highScore) {
        highScore = currentScore
        console.log(highScore)
        document.querySelector('.highscore').textContent = highScore
      }

    }else if (inputNumber !== randomNo) {
      if (currentScore === 1) {
        currentScore = 1
        messageText('You lose')
      }else if (currentScore > 1) {
        currentScore--
        score.textContent = currentScore

        inputNumber > randomNo
        ? 
        messageText('Too high')
        :
        messageText('Too low')
      }
    }
  }
)

againBtn.addEventListener('click', function(){
  randomNo = Math.trunc(Math.random() * 18 ) + 3
  messageText('Start guessing...')
  score.textContent = 20
  currentScore = 20
  document.querySelector('.guess').value = ''
  secretNumber.textContent = '?'
  const body = document.querySelector('body')
  body.style.backgroundColor = '#222'
  secretNumber.style.width = '15rem'

})