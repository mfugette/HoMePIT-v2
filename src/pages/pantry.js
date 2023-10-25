import React from 'react';
import IngredientAddForm from '../components/ingredientAddForm.js';
import IngredientListItem from '../components/ingredientListItem.js';

export default function Pantry() {

  // React.useState() to define and set states of variables
  const [ingredients, setIngredients] = React.useState([]);

  //Method for Adding Ingredients
  const handleAddIngredient = (name, quantity) => {
    const ingredient = {
      id: self.crypto.randomUUID(),
      name,
      quantity,
      threshold,
      expirationDate,
      servingSize,
      calories,
      protein,
      fat,
      carbohydrate,
      purchasedServings,
      cost,
      location,
      userTags
    };
    setIngredients([...ingredients, ingredient]);
  }

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  }

  const increaseIngredientQty = (id) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.id === id) {
        return { ...ingredient, quantity: ingredient.quantity + 1 }
      }
      else {
        return ingredient;
      }
    }))
  }
  const decreaseIngredientQty = (id) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.id === id) {
        return { ...ingredient, quantity: ingredient.quantity - 1 }
      }
      else {
        return ingredient;
      }
    }))
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

              onIncrease={increaseIngredientQty}
              onDecrease={decreaseIngredientQty}
              onDeleteIngredient={handleRemoveIngredient}
            />
          ))}
        </ul>
      </div>
    </div>

  );
}