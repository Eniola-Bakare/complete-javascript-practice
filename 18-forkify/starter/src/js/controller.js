import * as model from './model.js'
import paginationView from './views/PaginationView.js';
import ResultsView from './views/ResultsView.js';
import bookmarkView from './views/bookmarkView.js';
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';
import addRecipeView from './views/addRecipeView.js';
import { SEC } from './config.js';

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
    bookmarkView.render(model.state.bookmarks)
    return recipeView.render(model.state.recipe)
  }

  const controlBookmarkLoad = function(){
    bookmarkView.render(model.state.bookmarks)
  }
  
  const controlAddRecipe = async function(newRecipe){
    try{
      // load spinner while waiting
      addRecipeView.renderSpinner()
      // uploading new recipe
      await model.uploadRecipe(newRecipe)
      
      // render new recipe
      recipeView.render(model.state.recipe)

      // success message
      addRecipeView.renderMessage()

      // render bookmarks
      bookmarkView.render(model.state.bookmarks)
      console.log(model.state.bookmarks)

      // change id in the url
      window.history.pushState(null, '', `#${model.state.recipe.id}`)
      // close form
      setTimeout(function(){
        addRecipeView.toggleHandler()
      }, SEC * 1000)

    }catch(err){
      addRecipeView.renderError(err.message)
    }
  }


  // Design Patterns in programming are standard solutions to certain kinds of problems.
  // Publisher ~ Subscriber  design pattern
  const init = function (){
    bookmarkView.addHandler(controlBookmarkLoad)
    recipeView.addHandlerRender(controlRecipe)
    searchView.addSearchHandler(controlSearchResults)
    paginationView.addEventListenerForClicks(paginationController)
    recipeView.addUpdateHandler(controlUpdate)
    recipeView.addBookmarkHandler(controlBookmarks)
    addRecipeView.addUploadHandler(controlAddRecipe)
}
init()