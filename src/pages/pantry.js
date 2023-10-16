import React from 'react';
import IngredientAddForm from '../components/ingredientAddForm.js';
import IngredientListItem from '../components/ingredientListItem.js';

export default function Pantry() {

  // React.useState() to define and set states of variables
  const [ingredients, setIngredients] = React.useState([]);

  //Method for Adding Ingredients
  const handleAddIngredient = (name) => {
    const ingredient = {
      name,
      id: self.crypto.randomUUID(),
      quantity: 0,
    };
    setIngredients([...ingredients, ingredient]);
  }

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  }

  const increaseIngredientQty = (id) => {
    
  }
  const decreaseIngredientQty = (id) => {
    
  }

  // Input boxes for adding an ingredient & list of ingredients in Pantry. Needs to be worked on.
  console.log(ingredients);
  return (
    <div>
      <IngredientAddForm onAddIngredient={handleAddIngredient} />

      <div>
        <h3>Your Ingredients:</h3>
        <ul className="foodList">
          {ingredients.map(ingredient => (
            <IngredientListItem
              key={ingredient.id}
              id={ingredient.id}
              name={ingredient.name}
              quantity={ingredient.quantity}
              // onIncreaseIngredient={increaseIngredientQty}
              // onDecreaseIngredient={decreaseIngredientQty}
              onDeleteIngredient={handleRemoveIngredient}
            />
          ))}
        </ul>
      </div>
    </div>

  );
}