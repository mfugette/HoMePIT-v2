import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import supabase from "@/config/supabaseClient";

export default function IngredientEditForm({ onEditIngredient }) {
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

    const editData = async (e) => {
        e.preventDefault();
        onAddIngredient(
            name,
            quantity,
            threshold,
            servingSize,
            calories,
            protein,
            fat,
            carbohydrate,
            purchasedServings,
            cost,
        );
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
                    }
                ])
                .select();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div>

            <Popup trigger={<button>Edit</button>} position={"bottom right"}>

                <form onSubmit={editData} className="edit">
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

            
        </div>



    )
}
