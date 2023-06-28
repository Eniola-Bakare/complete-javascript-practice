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


class Workouts {
  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workouts {
  type = 'running'
  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration)
    this.cadence =cadence
    this.calcPace();
  }

  calcPace (){
    this.pace = this.duration / this.distance;
    return this.pace
  }
}
class Cycling extends Workouts {
  type = 'cycling'
  constructor(coords, distance, duration, elevationGain){
    super(coords, distance, duration)
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed () {
    this.speed = this.distance / (this.duration / 60)
    return this.speed
  }
}

// const running1 = new Running([5.4444, 3.333], 12, 30, 23)
// const cycling1 = new Cycling([5.4444, 3.333], 12, 30, 23)

// PROJECT ARCHITECTURE

class App {
  #map;
  #mapEvent;
  #workouts = []
  constructor(){
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this))
    inputType.addEventListener('change', this._toggleElevationField)
  }

  _getPosition(){
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
      alert('Could not find your location')
    })
  }
  _loadMap(position){
      const {latitude} = position.coords
      const {longitude} = position.coords
      
      const coords = [latitude, longitude]
      this.#map = L.map('map').setView(coords, 14);
  
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);
  
      
      this.#map.on('click', this._showForm.bind(this))
  }
  _showForm(mapE){
    this.#mapEvent = mapE.latlng
        form.classList.remove('hidden')
        inputDistance.focus();
  }
  _toggleElevationField(){
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
      inputDistance.focus()
  }
  _newWorkout(e){
    
    e.preventDefault()
    const validateInput = (...inputs) =>
    inputs.every(inp => Number.isFinite(inp))
    const allPositive = (...inputs) => inputs.every(inp => inp > 0)
    
    
    // Creating new objects from input
    const type = inputType.value
    const duration = +inputDuration.value
    const distance = +inputDistance.value
    const {lat, lng} = this.#mapEvent
    let workout;

      if (type === 'running') {
        const cadence = +inputCadence.value

        if(!validateInput(cadence, distance, duration) ||
          !allPositive(cadence, distance, duration)
          )
          return alert('Inputs have to be positive numbers')

        workout = new Running ([lat, lng], distance, duration, cadence)
        this.#workouts.push(workout)

      }

      if (type === 'cycling') {
        const elevationGain = +inputElevation.value

        if (!validateInput(elevationGain, distance, duration) ||
            !allPositive(distance, duration)
        )
          return alert('Inputs have to be positive numbers')

          workout = new Cycling ([lat, lng], distance, duration, elevationGain)
          this.#workouts.push(workout)
      }

      // displaying maker
      this._renderMaker(workout, lat, lng)
       

        // clear input duration
        inputDuration.value = inputCadence.value = inputDistance.value = inputElevation.value = ''
        // adding hide class to the form after marking location on the map
        form.classList.add('hidden')
        
  }
  _renderMaker(workout, lat, lng){
    L.marker(workout.coords).addTo(this.#map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWIdth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${workout.type}-popup`
    }))
    .setPopupContent(inputType.value === 'running' ? 'Running' : 'Cycling')
    .openPopup();
  }

}
  const app = new App()


