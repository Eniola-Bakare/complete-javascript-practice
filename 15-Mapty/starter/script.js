'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const resetBtn = document.querySelector('#resetData')

class App {
  #map;
  #mapZoomLevel = 14;
  #mapEvent;
  #workouts = []
  constructor(){
    // get user's position
    this._getPosition();

      // get data from local storage
    this._getData()

    // attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this))
    inputType.addEventListener('change', this._toggleElevationField)
    containerWorkouts.addEventListener('click', this._moveToMaker.bind(this))
    resetBtn.addEventListener('click', this._clearLocalStorage.bind(this))
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
      this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
  
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);
  
      
      this.#map.on('click', this._showForm.bind(this))
      this.#workouts.forEach(eachWorkOut => {
        this._renderMaker(eachWorkOut)
      })
  }
  _showForm(mapE){
    this.#mapEvent = mapE.latlng
        form.classList.remove('hidden')
        inputDistance.focus();
  }
  _hideForm(){
    
        // clear input duration
        inputDuration.value = inputCadence.value = inputDistance.value = inputElevation.value = ''
        form.style.display = 'none'
        // adding hide class to the form after marking location on the map
        setTimeout(() => form.style.display = 'grid', 1000);
        form.classList.add('hidden')
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
      this._renderWorkout(workout)
       
      // hide form after render
      this._hideForm()

      // saving to local storge
      this._setLocalStorage()
        
  }
  _renderMaker(workout){
      // check if the map has loaded before restoring map markers from local storage
      if(!this.#map) return
    L.marker(workout.coords).addTo(this.#map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWIdth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${workout.type}-popup`
    }))
    .setPopupContent(`${workout.type === 'running'? '🏃' : '🚴‍♀️'} ${workout.description}`)
    .openPopup();
  }

  _renderWorkout(workout){
    let html = 
      `<li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
    `;
    }

    if (workout.type === 'cycling')
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
      `;

      form.insertAdjacentHTML('afterend', html)
  }

  _moveToMaker(e){
      let workoutEl = e.target.closest('.workout')
      if(!workoutEl) return

      const workout = this.#workouts.find(
        work => work.id === Number(workoutEl.dataset.id)
      );
      this.#map.setView(workout.coords, this.#mapZoomLevel, {
        pan: {
          duration: 2.5
        }
      })
  }

  _setLocalStorage(){
    localStorage.setItem('workout', JSON.stringify(this.#workouts))
  }

  _getData(){
    const data = JSON.parse(localStorage.getItem('workout'))
    if (!data)  return

    this.#workouts = data
    this.#workouts.forEach(eachWorkOut => {
      this._renderWorkout(eachWorkOut);
    })
    // data.forEach(eachWork => new Workouts(this._renderWorkout(eachWork)))

  }
  _clearLocalStorage(){
    localStorage.removeItem('workout')
    console.log('Well, done!')

    location.reload()
  }
}

class Workouts {
  date = new Date()
  id = this.date.getTime()
  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription(type){
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    
  }
}

class Running extends Workouts {
  type = 'running'
  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration)
    this.cadence = cadence
    this.calcPace();
    this._setDescription(this.type)
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
    this._setDescription(this.type)
  }

  calcSpeed () {
    this.speed = this.distance / (this.duration / 60)
    return this.speed
  }
}

// const running1 = new Running([5.4444, 3.333], 12, 30, 23)
// const cycling1 = new Cycling([5.4444, 3.333], 12, 30, 23)

// PROJECT ARCHITECTURE


  const app = new App()


