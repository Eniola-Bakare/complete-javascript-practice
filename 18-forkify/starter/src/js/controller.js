import * as model from './model.js'
import paginationView from './views/PaginationView.js';
import ResultsView from './views/ResultsView.js';
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


if(module.hot){
  module.hot.accept()
}

const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return
    
    // Load spinner
    recipeView.renderSpinner()
    
    // Load Recipe
    await model.loadRecipe(id);

    // rendering the recipe
    recipeView.render(model.state.recipe)

    } catch (err){
      // alert(err)
      recipeView.renderError()
    }
  }


  const controlSearchResults = async function(e){
    try {
      // prevent page reloading
      e.preventDefault()

      // load spinner
      ResultsView.renderSpinner()
      // get search query
      const query = searchView.getQuery();
      if(!query) return;

      // Load search result
      await model.loadSearchResult(query)

        //ResultsView.render( model.state.search.result)
        ResultsView.render( model.getSearchResultsPage(1))
        paginationView.render(model.state.search)
    } catch (error) {
      throw error;
    }
  }
  
  const paginationController = (goTo) => {
        ResultsView.render( model.getSearchResultsPage(goTo))
        paginationView.render(model.state.search)
  }
  
  const controlUpdate = (newServings) => {
    model.updateServings(newServings)
    recipeView.render(model.state.recipe)
  }

  const controlBookmarks = function(){
    if(!model.state.recipe.bookmarked){
      model.addBookmarks(model.state.recipe);
    }else if(model.state.recipe.bookmarked){      
      model.removeBookMarks(model.state.recipe.id)
    }
    return recipeView.render(model.state.recipe)
  }
  
  // Design Patterns in programming are standard solutions to certain kinds of problems.
  // Publisher ~ Subscriber  design pattern
  const init = function (){
    recipeView.addHandlerRender(controlRecipe)
    searchView.addSearchHandler(controlSearchResults)
    paginationView.addEventListenerForClicks(paginationController)
    recipeView.addUpdateHandler(controlUpdate)
    recipeView.addBookmarkHandler(controlBookmarks)
    
}
init()