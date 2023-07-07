import * as model from './model.js'
import recipeView from './views/recipeView'


// import { after } from 'lodash-es';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');
const introMessage = document.querySelector('.message');


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

     console.log(recipe)
      
    }catch(err){
      // alert(err)
    }
  }
  const eventArr = ['hashchange', 'load']
  eventArr.forEach(event => window.addEventListener(event, controlRecipe));
// controlRecipe()