import Views from "./Views";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";

class BookmarkView extends Views {
  _parentEl  = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmoark it for later ;).'

  _generateHtml(){
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
  }

}

export default new BookmarkView()