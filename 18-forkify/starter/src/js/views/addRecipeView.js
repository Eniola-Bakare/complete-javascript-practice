import Views from "./Views";

class AddrecipeView extends Views {
  _parentEl = document.querySelector('.upload');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _message = 'Successfully added your recipe! Have a blast cooking';

  constructor(){
    super()
    this._addShowHandler()
    this._addHideHandler()
  }
  toggleHandler(){
    this._overlay.classList.toggle('hidden')
    this._recipeWindow.classList.toggle('hidden')
  }

  _addShowHandler(){
    this._btnOpen.addEventListener('click', this.toggleHandler.bind(this))
  }
  _addHideHandler(){
    this._btnClose.addEventListener('click', this.toggleHandler.bind(this))
    this._overlay.addEventListener('click', this.toggleHandler.bind(this))
  }

  addUploadHandler(handler){
    this._parentEl.addEventListener('submit', function(e){
    e.preventDefault();
    const dataArr = [...new FormData(this)]
    const data = Object.fromEntries(dataArr)
    handler(data)
    })

  }
  
}

export default new AddrecipeView()