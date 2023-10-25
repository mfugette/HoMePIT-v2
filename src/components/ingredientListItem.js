import React from 'react';
//import Pantry from 'pages/pantry.js'

export default function IngredientListItem({ id, name, quantity, onIncrease, onDecrease, onDeleteIngredient }) {


  const onIncreaseIngredient = () => {
    onIncrease(id);
  }

  const onDecreaseIngredient = () => {
    onDecrease(id);
  }

  return (
    <li className="foodList">
      {name}: {quantity}

      <button onClick={onIncreaseIngredient}>Increase</button>
      <button onClick={onDecreaseIngredient}>Decrease</button>
      <button onClick={() => onDeleteIngredient(id)}>Delete</button>
    </li>
  );
};
