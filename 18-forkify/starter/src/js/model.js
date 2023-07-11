import {asnyc} from 'regenerator-runtime'
import {API_URL,  RESULTS_PER_PAGE, API_KEY} from './config'
// import { getJSON, sendJSON } from './helpers';
import { AJAX } from './helpers';
import { before } from 'lodash-es';

export const state = {
  recipe: { },
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObj = function(data){
   // save data as state
   const { recipe } = data.data;

   return {
     id: recipe.id,
     title: recipe.title,
     image: recipe.image_url,
     publisher: recipe.publisher,
     sourceUrl: recipe.source_url,
     serving: recipe.servings,
     ingredients: recipe.ingredients,
     cookingTime: recipe.cooking_time,
     ...(recipe.key && {'key': recipe.key})
   }

}

export const loadRecipe = async function(id) {
  try{

    // // To fetch data
    const data = await AJAX(`${API_URL}${id}`)

   state.recipe = createRecipeObj(data)
    if(state.bookmarks.some(bookmarkObj => bookmarkObj.id === id)){
      state.recipe.bookmarked = true;
    }else state.recipe.bookmarked = false;

  }catch(err){
    throw err;
  }
}

export const loadSearchResult = async function(query){
  try{
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.result = data.data.recipes.map(rec => {
      return{
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
        ...(rec.key && {'key': rec.key})
      }
    })

  } catch (err){
    console.log(err)
    throw err;
  }
}


export const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage
  const end = (page * state.search.resultsPerPage)
  return state.search.result.slice(start, end)
}

export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.serving
  })
  state.recipe.serving = newServings;
}


const peristBookmarks = function(){
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks))
}

export const addBookmarks = function(recipe){
  state.bookmarks.push(recipe);

  if(recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  peristBookmarks(state.bookmarks)
} 

export const removeBookMarks = function(id){
  const bookmarkElIndex = state.bookmarks.findIndex(recipeObj => {
    return recipeObj.id === id
  })
  if(state.recipe.id === id){
    state.recipe.bookmarked = false;
    state.bookmarks.splice(bookmarkElIndex, 1)
  }
  peristBookmarks(state.bookmarks)
}

const init = function(){
  const storage = localStorage.getItem('bookmark')
  if(storage){
    state.bookmarks = JSON.parse(storage)
  }
}
init()


// Uploading recipe
export const uploadRecipe = async function(newRecipe){
  try{
     const ingredients = Object.entries(newRecipe)
  .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  .map(ing => {
    const ingArr = ing[1].replaceAll(' ', '').split(',');
    if(ingArr.length !== 3) throw new Error ('Wrong ingredient format. Please use the correct format: quantity, unit, description. :)') 

    const [quantity, unit, description] = ingArr;
  return {quantity: quantity ? +quantity : null , unit, description}
  })
  
  // object to be uploaded
  const recipe = {
    id: newRecipe.id,
    image_url: newRecipe.image,
    title: newRecipe.title,
    publisher: newRecipe.publisher,
     source_url: newRecipe.sourceUrl,
     servings: +newRecipe.servings,
     ingredients,
     cooking_time: +newRecipe.cookingTime,
    }

   const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe)
   state.recipe = createRecipeObj(data)
   addBookmarks(state.recipe)
   console.log(state.bookmarks)
  }catch(err){
    throw err
  }
 
}

