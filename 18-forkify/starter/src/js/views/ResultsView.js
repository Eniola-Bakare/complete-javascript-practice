import Views from "./Views";
import icons from 'url:../../img/icons.svg';

class ResultsView extends Views {
  _parentEl  = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipe found for your query. Please try again ;).'
  _message = ''

  _generateHtml(){
    return `
      <li class="preview">
        <a class="preview__link" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
          </div>
        </a>
      </li>
    `
  }

}

export default new ResultsView()