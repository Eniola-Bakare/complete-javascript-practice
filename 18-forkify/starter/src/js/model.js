import {asnyc} from 'regenerator-runtime'
import {API_URL} from './config'
import { getJSON } from './helpers';

export const state = {
  recipe: { },
};

export const loadRecipe = async function(id) {
  try{

    // To fetch data
    // const data = await getJSON(`${API_URL}${id}`)

    // save data as state
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      serving: recipe.servings,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time 
    }
  }catch(err){
    console.log(err)
  }
}