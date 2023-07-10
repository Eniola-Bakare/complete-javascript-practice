import { isEmpty } from 'lodash-es';
import icons from 'url:../../img/icons.svg';

export default class Views {
  _data;

  render(data){
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    
    this._data = data
    this._clear()
    const html = this._generateHtml();
    this._parentEl.insertAdjacentHTML('afterbegin', html)
  }

  _clear(){
    this._parentEl.innerHTML = ''
  }

  renderSpinner (){
      let html = `
          <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `
      this._clear()
       this._parentEl.insertAdjacentHTML('afterbegin', html)   
  }

  renderError(message = this._errorMessage){
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', html)
  }
  renderMessage(){
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>

    `
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', html)
  }
}