// import React from 'react';
// import supabase from '@/config/supabaseClient';
// import { data } from 'autoprefixer';
// //import Pantry from 'pages/pantry.js'

// export default function IngredientListItem({ id, name, quantity, onIncrease, onDecrease, onDeleteIngredient }) {


//   const onIncreaseIngredient = () => {
//     onIncrease(id);
//   }

//   const onDecreaseIngredient = () => {
//     onDecrease(id);
//   }


//   // const getAllIngredients = async () => {
//   //   try {
//   //     const { data } = await supabase
//   //       .from('Ingredients')
//   //       .select('*');
//   //     return data;

//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

// console.log(getAllIngredients())

//   return (
//     <li className="foodList">
//       {data.name}

//       <button onClick={onIncreaseIngredient}>Increase</button>
//       <button onClick={onDecreaseIngredient}>Decrease</button>
//       <button onClick={() => onDeleteIngredient(id)}>Delete</button>
//     </li>
//   );
// };
