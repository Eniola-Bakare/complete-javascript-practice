'use strict';

let openBtn = document.querySelectorAll('.show-modal')
let modalContainer = document.querySelector('.modal')
let closeBtn = document.querySelector('.close-modal')
let overlay = document.querySelector('.overlay')

const openModalFunc = function (){
  modalContainer.classList.remove('hidden')
  overlay.classList.remove('hidden')
}
const closeModalFunc = function (){
    modalContainer.classList.add('hidden')
    overlay.classList.add('hidden')
  }

for (let index = 0; index < openBtn.length; index++){
  let eachBtn = openBtn[index]
  eachBtn.addEventListener('click', openModalFunc)
}
  
closeBtn.addEventListener('click', closeModalFunc)
overlay.addEventListener('click', closeModalFunc)

document.addEventListener('keydown', function (e){
  console.log(e.key)
  if(e.key === 'escape' && !modalContainer.classList.contains('hidden')){
    closeModalFunc()
  }
})