import * as model from './model.js'
import recipeView from './views/recipeView.js'


import { after } from 'lodash-es';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


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
// console.log('Ehn')
// console.log('Oka')

// fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')
// .then(res => res.json())
// .then(data => console.log(data))

const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return

    // Load spinner
    recipeView.renderSpinner()

    // Load Recipe
    await model.loadRecipe(id);
    console.log(id, '-----------------id')
    
    // rendering the recipe
    recipeView.render(model.state.recipe)

     console.log(recipe)
      
    }catch(err){
      // alert(err)
    }
  }
  const eventArr = ['hashchange', 'load']
  eventArr.forEach(event => window.addEventListener(event, controlRecipe));
controlRecipe()