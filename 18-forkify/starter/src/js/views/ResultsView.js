import Views from "./Views";
import icons from 'url:../../img/icons.svg';

class ResultsView extends Views {
  _parentEl  = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipe found for your query. Please try again ;).'
  _message = ''

  _generateHtml(){
    return this._data.map(this._generateHtmlPreview).join()
  }

  _generateHtmlPreview(eachResult){
    const id = window.location.hash.slice(1)
    return `
      <li class="preview">
        <a class="preview__link ${eachResult.id === id ? 'preview__link--active ' : ''}"  href="#${eachResult.id}">
          <figure class="preview__fig">
            <img src="${eachResult.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${eachResult.title}</h4>
            <p class="preview__publisher">${eachResult.publisher}</p>
          </div>
        </a>
      </li>
    `
  }

}

export default new ResultsView()