import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import supabase from "@/config/supabaseClient";

//import { useState } from "react"

//const [ingredientQuantity, setIngredientQuantity] = React.useState(0);

export default function IngredientAddForm({ onAddIngredient }) {
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState();
    const [threshold, setThreshold] = React.useState();
    //const [expirationDate, setExpirationDate] = React.useState('');
    const [servingSize, setServingSize] = React.useState();
    const [calories, setCalories] = React.useState();
    const [protein, setProtein] = React.useState();
    const [fat, setFat] = React.useState();
    const [carbohydrate, setCarbohydrate] = React.useState();
    const [purchasedServings, setPurchasedServings] = React.useState();
    const [cost, setCost] = React.useState();
    //const [location, setLocation] = React.useState('');
    //const [userTags, setUserTags] = React.useState('');

    const addData = async (e) => {
        e.preventDefault();
        onAddIngredient(
            name,
            quantity,
            threshold,
            //expirationDate,
            servingSize,
            calories,
            protein,
            fat,
            carbohydrate,
            purchasedServings,
            cost,
            // location,
            // userTags
        );
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
                    }
                ]);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     onAddIngredient(
    //         name,
    //         quantity,
    //         threshold,
    //         expirationDate,
    //         servingSize,
    //         calories,
    //         protein,
    //         fat,
    //         carbohydrate,
    //         purchasedServings,
    //         cost,
    //         location,
    //         userTags
    //     );

    //     setName('');
    //     setQuantity('');
    //     setThreshold('');
    //     setExpirationDate('');
    //     setServingSize('');
    //     setCalories('');
    //     setProtein('');
    //     setFat('');
    //     setCarbohydrate('');
    //     setPurchasedServings('');
    //     setCost('');
    //     setLocation('');
    //     setUserTags('');


    // }


    return (

        <div>

            <Popup trigger={<button>Add New Ingredient</button>} position={"bottom right"}>

                <form onSubmit={addData} className="add">
                    <h3>Input Food</h3>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    {/* <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(parseInt(e.target.value))} /> */}
                    <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />

                    {/* <input type="text" placeholder="Expiration Date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} /> */}
                    <input type="text" placeholder="Serving Size" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
                    <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
                    <input type="text" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
                    <input type="text" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
                    <input type="text" placeholder="Carbohydrate" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
                    <input type="text" placeholder="Purchased Servings" value={purchasedServings} onChange={(e) => setPurchasedServings(e.target.value)} />
                    <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
                    {/* <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="User Tags" value={userTags} onChange={(e) => setUserTags(e.target.value)} /> */}
                    <button type="submit">Add Ingredient</button>
                </form>

            </Popup>

            <Popup trigger={<button>Edit</button>} position={"bottom right"}>

            </Popup>
        </div>



    )
}
