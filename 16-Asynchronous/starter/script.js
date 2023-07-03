'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


// PROMISES

// fetch(`https://api.coinlore.net/api/exchanges/`)
// .then(function(response){
//   // console.log(response)
//   // console.log(response.json())
//   return response.json()
// })
// .then(function(data){
//   console.log(data)
// })

// fetch(`https://jsonplaceholder.typicode.com/todos/1`)
// .then(response => {response.json()})
// .then(data => console.log(data))

// XMLHTTPREQUEST
const REQUESTXML = new XMLHttpRequest()
  REQUESTXML.open('GET', `https://jsonplaceholder.typicode.com/todos/2`)
  REQUESTXML.send()

  REQUESTXML.addEventListener('load', function(){
    console.log(REQUESTXML.responseText)
    console.log(REQUESTXML.status)
    console.log(REQUESTXML)
  })

  