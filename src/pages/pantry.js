import React from 'react';
import { useEffect } from 'react';
import supabase from '@/config/supabaseClient.js';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import IngredientForm from '@/components/pantryComponents/ingredientForm.js';
import { data } from 'autoprefixer';
import { Result } from 'postcss';

export default function Pantry() {

  const [ingredients, setIngredients] = React.useState([]);
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState();
  const [threshold, setThreshold] = React.useState();
  const [servingSize, setServingSize] = React.useState();
  const [calories, setCalories] = React.useState();
  const [protein, setProtein] = React.useState();
  const [fat, setFat] = React.useState();
  const [carbohydrate, setCarbohydrate] = React.useState();
  const [purchasedServings, setPurchasedServings] = React.useState();
  const [cost, setCost] = React.useState();
  const [uid, setUid] = React.useState();

  supabase.auth.getUser().then(value => {
    try {
      setUid(value.data.user.id)
    } catch { }
  })

  const createIngredient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Ingredients')
        .insert([
          {
            ing_name: name,
            ing_qnt: quantity,
            ing_threshold_qnt: threshold,
            ing_serv_qnt: servingSize,
            ing_serv_cal: calories,
            ing_serv_prot: protein,
            ing_serv_fat: fat,
            ing_serv_carb: carbohydrate,
            ing_purchase_serv_cnt: purchasedServings,
            ing_purchase_cost: cost,
            user_id: uid
          }
        ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateIngredient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Ingredients')
        .update([
          {
            ing_name: name,
            ing_qnt: quantity,
            ing_threshold_qnt: threshold,
            ing_serv_qnt: servingSize,
            ing_serv_cal: calories,
            ing_serv_prot: protein,
            ing_serv_fat: fat,
            ing_serv_carb: carbohydrate,
            ing_purchase_serv_cnt: purchasedServings,
            ing_purchase_cost: cost,
            user_id: uid
          }
        ])
        .select();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readIngredient = async () => {
      try {
        const response = await supabase
          .from('Ingredients')
          .select('ing_id, ing_name, ing_qnt')
        // .range(0, 4)
        const data = response.data;
        setIngredients(data);
        console.log(await supabase.auth.getUser())
      } catch (error) {
        console.error(error);
      }
    };
    readIngredient();
  }, []);

  const deleteIngredient = async (id) => {
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

  return (
    <>

      <div>
        <div>
          <Popup trigger={<button>Add New Ingredient</button>} position={"bottom right"}>

            <form onSubmit={createIngredient} className="add">
              <h3>Input Food</h3>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
              <input type="text" placeholder="Serving Size" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
              <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
              <input type="text" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
              <input type="text" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
              <input type="text" placeholder="Carbohydrate" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
              <input type="text" placeholder="Purchased Servings" value={purchasedServings} onChange={(e) => setPurchasedServings(e.target.value)} />
              <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />

              <button type="submit">Add Ingredient</button>
            </form>

          </Popup>
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
                  <Popup trigger={<button>Edit</button>} position={"bottom right"}>

                    <form onSubmit={updateIngredient} className="edit">
                      <h3>Edit Food</h3>
                      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                      <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                      <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
                      <input type="text" placeholder="Serving Size" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
                      <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
                      <input type="text" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
                      <input type="text" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
                      <input type="text" placeholder="Carbohydrate" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
                      <input type="text" placeholder="Purchased Servings" value={purchasedServings} onChange={(e) => setPurchasedServings(e.target.value)} />
                      <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />

                      <button type="submit">Edit Ingredient</button>
                    </form>

                  </Popup>
                  <button onClick={() => deleteIngredient(ingredient.ing_id)}>Remove</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>

  );
};
