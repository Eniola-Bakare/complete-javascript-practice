import Views from "./Views";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";

class ResultsView extends Views {
  _parentEl  = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipe found for your query. Please try again ;).'
  _message = ''

  _generateHtml(){
    return this._data.map(result => previewView.render(result, false)).join('')
  }

}

export default new ResultsView()