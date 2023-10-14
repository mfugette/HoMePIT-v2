import React from 'react';
import IngredientList from '../components/ingredientList.js';

export default function Pantry() {

  // React.useState() to define and set states of variables
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientName, setIngredientName] = React.useState('');
  const [ingredientQuantity, setIngredientQuantity] = React.useState('');
  const [ingredientThreshold, setIngredientThreshold] = React.useState('');
  const [ingredientExpiration, setIngredientExpiration] = React.useState('');
  const [ingredientServingSize, setIngredientServingSize] = React.useState('');
  const [ingredientCalories, setIngredientCalories] = React.useState('');
  const [ingredientProtein, setIngredientProtein] = React.useState('');
  const [ingredientFat, setIngredientFat] = React.useState('');
  const [ingredientCarb, setIngredientCarb] = React.useState('');
  const [ingredientPurchasedServings, setIngredientPurchasedServings] = React.useState('');
  const [ingredientCost, setIngredientCost] = React.useState('');
  const [ingredientLocation, setIngredientLocation] = React.useState('');

  // Defining an Ingredient
  const ingredient = {
    id: ingredients.length + 1,
    name: ingredientName,
    quantity: ingredientQuantity,
    threshold: ingredientThreshold,
    expiration: ingredientExpiration,
    servingSize: ingredientServingSize,
    calories: ingredientCalories,
    protein: ingredientProtein,
    fat: ingredientFat,
    carb: ingredientCarb,
    purchasedServings: ingredientPurchasedServings,
    cost: ingredientCost,
    location: ingredientLocation,
    //substitution[]: Ingredient, 
  };


  //THIS COMES FROM Pantry.js
  //Method for Adding Ingredients
  const addIngredients = (myIngredient) => {
    console.log("My ingred:", myIngredient);

    setIngredients([...ingredients, ingredient]);
  }

  //THIS COMES FROM IngreidentList.js (move?)
  const addIngredient = (myIngredient) => {
    console.log("My ingred:", myIngredient.name);
      
    setIngredients([...ingredients, ingredient]);
    
  }

  //THIS COMES FROM IngreidentList.js
  //Method for Removing Ingredients (work on this)
  const removeIngredient = (myIngredient) => {
    console.log("My ingred:", myIngredient.name); // why different ?
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== myIngredient.id ));
  }

  const updateIngredientQuantity = (ingredientID, newQuantity) => { }

  // Input boxes for adding an ingredient & list of ingredients in Pantry. Needs to be worked on.
  console.log(ingredients);
  return (
    <div>
      <div class="add">
        <h3>Add Ingredient</h3>
        <input type="text" placeholder="Name" value={ingredientName} onChange={(event) => setIngredientName(event.target.value)} />
        <input type="text" placeholder="Quantity" value={ingredientQuantity} onChange={(event) => setIngredientQuantity(event.target.value)} />
        <input type="text" placeholder="Threshold" value={ingredientThreshold} onChange={(event) => setIngredientThreshold(event.target.value)} />
        <input type="text" placeholder="Expiration Date" value={ingredientExpiration} onChange={(event) => setIngredientExpiration(event.target.value)} />
        <input type="text" placeholder="Serving Size" value={ingredientServingSize} onChange={(event) => setIngredientServingSize(event.target.value)} />
        <input type="text" placeholder="Calories" value={ingredientCalories} onChange={(event) => setIngredientCalories(event.target.value)} />
        <input type="text" placeholder="Protein" value={ingredientProtein} onChange={(event) => setIngredientProtein(event.target.value)} />
        <input type="text" placeholder="Fat" value={ingredientFat} onChange={(event) => setIngredientFat(event.target.value)} />
        <input type="text" placeholder="Carbs" value={ingredientCarb} onChange={(event) => setIngredientCarb(event.target.value)} />
        <input type="text" placeholder="Servings Purchased" value={ingredientPurchasedServings} onChange={(event) => setIngredientPurchasedServings(event.target.value)} />
        <input type="text" placeholder="Cost" value={ingredientCost} onChange={(event) => setIngredientCost(event.target.value)} />
        <input type="text" placeholder="Location Purchased" value={ingredientLocation} onChange={(event) => setIngredientLocation(event.target.value)} />
        <input type="text" placeholder="Substitution" />
        <button type="button" onClick={addIngredients}>Add Ingredient</button>

      </div>

      <div>
        <h3>Your Ingredients:</h3>
        <ul class="foodList">
          {ingredients.map((ingredient) => (
            <IngredientList
              key={ingredient.id}
              ingredient={ingredient}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />
          ))}
        </ul>
      </div>
    </div>

  );
}