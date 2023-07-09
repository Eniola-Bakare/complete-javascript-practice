import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');
const introMessage = document.querySelector('.message');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
      console.log(err)
      recipeView.renderError()
    }
  }


  const controlSearchResults = async function(e){
    try {
      // prevent page reloading
      e.preventDefault()

      // get search query
      const query = searchView.getQuery();
      if(!query) return;

      // Load search result
      await model.loadSearchResult(query)
      console.log(model.state.search)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  // Design Patterns in programming are standard solutions to certain kinds of problems.
  // Publisher ~ Subscriber  design pattern
  const init = function (){
    recipeView.addHandlerRender(controlRecipe)
    searchView.addSearchHandler(controlSearchResults)
}
init()