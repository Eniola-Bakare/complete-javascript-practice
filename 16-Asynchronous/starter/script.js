'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images')

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
// const REQUESTXML = new XMLHttpRequest()
//   REQUESTXML.open('GET', `https://jsonplaceholder.typicode.com/todos/2`)
//   REQUESTXML.send()

  // REQUESTXML.addEventListener('load', function(){
  //   console.log(REQUESTXML.responseText)
  //   console.log(REQUESTXML.status)
  //   console.log(REQUESTXML)
  // })

  ///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

*/

// attempt


// const REVERSEGEOCODING = function(lat, lng){
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=316658685551974991932x45971`)
//   .then(response => {
//     console.log(response)
//     return response.json()
//   })
//   .then(data => {
//     if(data.error){
//       throw new Error ('please, Wait a minute')
//     }
//     // console.log(`You are in ${data.city}, ${data.country}`)
//     countriesContainer.insertAdjacentText( "afterend",`You are in ${data.city}, ${data.country}`)
//   })
//   .catch(err => {
//     console.log(err)
//     console.log(`Error, ${err.message}`)
  
//   })
//   .finally(countriesContainer.style.opacity = 1)
// }

// btn.addEventListener('click', function(){
//   // REVERSEGEOCODING(6.5110016, 3.391488);
//   // console.log(setTimeout(REVERSEGEOCODING(52.508, 13.381) ,1000), 'yuppp')
//   REVERSEGEOCODING(19.037, 72.873);
//   REVERSEGEOCODING(-33.933, 18.474);
// })

// PROMISIFYING

// const getLocationn = function(){
//   return new Promise(function (resolve, reject){
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // )

//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   });
// }

// getLocationn().then(res => console.log(res)).catch(err => console.error(err.message))

// console.log('Getting Locale')


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 1️⃣ 'createImage' which receives imgPath as an input. This function 2️⃣returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

// Solution attempt
const createImage = function(imgPath){
  return new Promise(function (resolve, reject){
    const imgDiv = document.createElement('img')
    imgDiv.src = imgPath
    imgDiv.addEventListener('load', resolve),
    reject
  })
}

createImage('./img/img-1.jpg')
  .then(res =>
    imgContainer.insertAdjacentElement('afterbegin', res.target
  ))
  .then(res => {
    setTimeout(function(){
      imgContainer.style.display = 'none'
      res.src = './img/img-2.jpg'      
    }, 2000)
  })
  .then(res => {
    setTimeout(function () {
      console.log('my timeee')
      imgContainer.style.display = 'flex'
    }, 4000)
  })
  .catch(err => console.log(`${err} 'I can\'t find you image'`))

  
  
  // Consuming promises with Asyn/Await
  // const REVERSEGEOCODING = async function(lat1, lng1, lat2, lng2, lat3, lng3){
  //  try{
  //    const res1 = await fetch(`https://geocode.xyz/${lat1},${lng1}?geoit=json&auth=316658685551974991932x45971`)
  //    const res2 = await fetch(`https://geocode.xyz/${lat2},${lng2}?geoit=json&auth=316658685551974991932x45971`)
  //    const res3 = await fetch(`https://geocode.xyz/${lat3},${lng3}?geoit=json&auth=316658685551974991932x45971`)

  //   const data1 = await res1.json()
  //   const data2 = await res2.json()
  //   const data3= await res3.json()
  //   console.log(data1.country, '----------------------COUNTRY1')
  //   console.log(data2.country, '----------------------------COUNTRY 2')
  //   console.log(data3.country, '----------------------------COUNTRY 3')

  //   countriesContainer.insertAdjacentText( "afterend",`You are in ${data1.city}, ${data1.country}`)
  //   }catch(err) {
  //     console.log(`Error, ${err.message}`)
    
  //   }
  //   countriesContainer.style.opacity = 1
  // }

// working with promise all
// const REVERSEGEOCODING = async function(lat1, lng1, lat2, lng2, lat3, lng3){
//   try{
//     const promiseALlArr = await Promise.all([
//       fetch(`https://geocode.xyz/${lat1},${lng1}?geoit=json&auth=316658685551974991932x45971`),
//       fetch(`https://geocode.xyz/${lat2},${lng2}?geoit=json&auth=316658685551974991932x45971`),
//       fetch(`https://geocode.xyz/${lat3},${lng3}?geoit=json&auth=316658685551974991932x45971`)
//   ])

//   console.log(promiseALlArr.map(eachData => eachData))
  
//   }catch(err) {
//      console.log(`Error, ${err.message}`)
//    }
//    countriesContainer.style.opacity = 1
//  }



//   REVERSEGEOCODING(19.037, 72.873, -33.933, 18.474, 6.5110016, 3.391488);

// Promise selectors
// Promise.all([
//   Promise.resolve('Resolved ------------1'),
//   Promise.reject('ERROR ------------1'),
//   Promise.resolve('ERROR ------------1')
// ])
// .then(res => console.log(res))
// .catch(err => console.error(`-------------${err}`))
// Promise.race([
//   Promise.resolve('Resolved ------------1'),
//   Promise.reject('ERROR ------------1'),
//   Promise.resolve('RESOLVED ------------2')
// ])
// .then(res => console.log(res))
// Promise.allSettled([
//   Promise.resolve('Resolved ------------1'),
//   Promise.reject('ERROR ------------1'),
//   Promise.resolve('RESOLVED ------------2')
// ])
// .then(res => console.log(res))
// .catch(err => console.error(`-------------${err}`))
// Promise.any([
//   Promise.reject('Resolved ------------1'),
//   Promise.reject('ERROR ------------1'),
//   Promise.resolve('RESOLVED ------------2')
// ])
// .then(res => console.log(res))
// .catch(err => console.error(`-------------${err}`))


// ////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// Solution attempt 1
// const createImage = function(imgPath){
//   return new Promise(function (resolve, reject){
//     const imgDiv = document.createElement('img')
//     imgDiv.src = imgPath
//     imgDiv.addEventListener('load', resolve),
//     reject
//   })
// }
// (async function(){
//   try{
//     const imgCreation = await createImage('./img/img-1.jpg')
//     const res = imgContainer.insertAdjacentElement('afterbegin', res.target)
//      setTimeout(function(){
//         imgContainer.style.display = 'none'
//         res.src = './img/img-2.jpg'      
//       }, 2000)
//       setTimeout(function () {
//         console.log('my timeee')
//         imgContainer.style.display = 'flex'
//       }, 4000)
//   } catch(err){
//     console.log(`${err} 'I can\'t find you image'`)
//   }})()

// sollution 2
const loadAll = async function(imgPaths){
  const imgs = await imgPaths.map(eachPath => {
    // eachPath.classList.add('paralell')
    createImage(eachPath)
  })
  console.log(await imgs)
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])