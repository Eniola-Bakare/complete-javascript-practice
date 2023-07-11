import { isEmpty } from 'lodash-es';
import icons from 'url:../../img/icons.svg';

export default class Views {
  _parentEl;
  _data;
  _message = 'Start by searching for a recipe or an ingredient. Have fun!'

  render(data, render = true){
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data
    const html = this._generateHtml();

    if(!render) return html
    this._clear()
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
  renderMessage(message = this._message){
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>

    `
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', html)
  }
}