class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery(){
    const query = this._parentEl.querySelector('.search__field').value;
    this._clear()
    return query;
  }

  _clear(){
    this._parentEl.querySelector('.search__field').value = ''
  }

  addSearchHandler(handler){
    this._parentEl.addEventListener('submit', handler)
  }
}

export default new SearchView();