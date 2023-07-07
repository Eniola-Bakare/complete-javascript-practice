import {asnyc} from 'regenerator-runtime'

export const state = {
  recipe: { },
};

export const loadRecipe = async function(id) {
  try{

    // const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    // const data = await res.json()
    // console.log(data, res)
    if(!res.ok) throw new Error(`${data.message} Error: ${res.status}`)
    
    const { recipe } = data.data
    console.log(recipe, 'jj')
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