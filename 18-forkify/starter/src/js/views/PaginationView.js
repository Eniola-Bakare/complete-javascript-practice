import { set } from "lodash-es";
import { RESULTS_PER_PAGE } from "../config";
import Views from "./Views";
import icons from 'url:../../img/icons.svg';

class PaginationView extends Views {
  _parentEl  = document.querySelector('.pagination');
  _data;

  addEventListenerForClicks(handler){
    this._parentEl.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline')
      if(!btn) return;

      const goTo = +btn.dataset.goto
      handler(goTo)
    })
  }
  
  _generateHtml(){
    const currentPage = this._data.page;
    const totalPages = Math.ceil(this._data.result.length / RESULTS_PER_PAGE)

  // first page and other page
  if(currentPage === 1 && totalPages > 1 ){
     return `
    <button data-goto = "${currentPage + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
     `
  }

  // last page 
  if(currentPage === totalPages && totalPages > 1){
    return `
        <button data-goto = "${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
    `
  } 

  // other pages
  if(currentPage < totalPages ) {
    return `
      <button data-goto = "${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>

      <button data-goto = "${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `
  } 

  // only 1 page
    return ''

  }



}

export default new PaginationView()