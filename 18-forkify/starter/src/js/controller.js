import * as model from './model.js'
import recipeView from './views/recipeView'


// import { after } from 'lodash-es';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';


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

      // Design Patterns in programming are standard solutions to certain kinds of problems.
      // Publisher ~ Subscriber  design pattern
const init = function (){
  recipeView.addHandlerRender(controlRecipe)
}
init()