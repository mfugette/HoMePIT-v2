import React from 'react';
import { useEffect } from 'react';
import IngredientAddForm from '../components/pantryComponents/ingredientAddForm.js';
import IngredientListItem from '../components/pantryComponents/ingredientListItem.js';
import supabase from '@/config/supabaseClient.js';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import IngredientEditForm from '@/components/pantryComponents/ingredientEditForm.js';

export default function Pantry() {

  // // React.useState() to define and set states of variables
  // const [ingredients, setIngredients] = React.useState([]);

  //Method for Adding Ingredients
  const handleAddIngredient = (
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
  ) => {

    const ingredient = {
      //id: self.crypto.randomUUID(),
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

  // const handleRemoveIngredient = (id) => {
  //   setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  // }

  // const increaseIngredientQty = (id) => {
  //   setIngredients(ingredients.map(ingredient => {
  //     if (ingredient.id === id) {
  //       return { ...ingredient, quantity: ingredient.quantity + 1 }
  //     }
  //     else {
  //       return ingredient;
  //     }
  //   }))
  // }
  // const decreaseIngredientQty = (id) => {
  //   setIngredients(ingredients.map(ingredient => {
  //     if (ingredient.id === id) {
  //       return { ...ingredient, quantity: ingredient.quantity - 1 }
  //     }
  //     else {
  //       return ingredient;
  //     }
  //   }))
  // }

  // const getAllIngredients = async () => {
  //   try {
  //     const { data } = await supabase
  //       .from('Ingredients')
  //       .select('ing_id, ing_qnt');
  //     return data;

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // console.log(getAllIngredients())


  // // Input boxes for adding an ingredient & list of ingredients in Pantry. Needs to be worked on.
  // return (
  //   <div>
  //     <IngredientAddForm onAddIngredient={handleAddIngredient} />

  //     <div>
  //       <h3>Your Ingredients:</h3>
  //       <p>{{getAllIngredients}}</p>
  //       <ul className="foodList">
  //         {ingredients.map(ingredient => (
  //           <IngredientListItem
  //             key={ingredient.id}
  //             id={ingredient.id}
  //             name={ingredient.name}
  //             quantity={ingredient.quantity}
  //             threshold={ingredient.threshold}

  //             onIncrease={increaseIngredientQty}
  //             onDecrease={decreaseIngredientQty}
  //             onDeleteIngredient={handleRemoveIngredient}
  //           />
  //         ))}
  //       </ul>
  //     </div>
  //   </div>

  // );
  const [ingredients, setIngredients] = React.useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await supabase
          .from('Ingredients')
          .select('ing_id, ing_name, ing_qnt')
        // .range(0, 4)
        const data = response.data;
        setIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const response = await supabase
        .from('Ingredients')
        .delete()
        .eq('ing_id', id)
      const data = response.data;
      setIngredients(data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  // }, []);

  return (
    <>

      <div>
        <div>
          <IngredientAddForm onAddIngredient={handleAddIngredient} />
          <h3>Your Ingredients:</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.ing_id}>
                <td>{ingredient.ing_name}</td>
                <td>{ingredient.ing_qnt}</td>

                <td>
                  {/* <button>Edit</button> */}
                  <IngredientEditForm/>
                  <button onClick={() => deleteData(ingredient.ing_id)}>Remove</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>

  );
};
