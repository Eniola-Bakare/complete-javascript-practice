'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let mapEvent, map;



  navigator.geolocation.getCurrentPosition(function(position){
    const {latitude} = position.coords
    const {longitude} = position.coords
    
    const coords = [latitude, longitude]
    map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    map.on('click', function(mapE){
      mapEvent = mapE.latlng
      form.classList.remove('hidden')
      inputDistance.focus()

    })
    
  }, function(){
    alert('Could not find your location')
  })
  
  // adding event listener for the submit form
  
  form.addEventListener('submit', function(e){
    e.preventDefault()

    // clear input duration
    inputDuration.value = inputCadence.value = inputDistance.value = inputElevation.value = ''

    // displaying maker
    const {lat, lng} = mapEvent
      L.marker([lat, lng]).addTo(map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWIdth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      }))
      .setPopupContent('Running!!')
      .openPopup();
  })

  inputType.addEventListener('change', function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputDistance.focus()
  })