import {asnyc} from 'regenerator-runtime'
import {API_URL} from './config'
import { getJSON } from './helpers';

export const state = {
  recipe: { },
  search: {
    query: '',
    result: [],
  }
};

export const loadRecipe = async function(id) {
  try{

    // // To fetch data
    const data = await getJSON(`${API_URL}${id}`)

    // save data as state
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      serving: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time 
    }
  }catch(err){
    throw err;
  }
}

export const loadSearchResult = async function(query){
  try{
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(rec => {
      return{
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      }
    })

  } catch (err){
    console.log(err)
    throw err;
  }
}
