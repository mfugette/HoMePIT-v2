import React from 'react';
import { useEffect } from 'react';
import supabase from '@/config/supabaseClient.js';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function RecipeBook() {

    const [recipes, setRecipes] = React.useState([]);
    const [name, setName] = React.useState('');
    const [servingCount, setServingCount] = React.useState();
    const [indCookTime, setIndCookTime] = React.useState();
    const [totalCookTime, setTotalCookTime] = React.useState();
    const [servingCalories, setServingCalories] = React.useState();
    const [servingProtein, setServingProtein] = React.useState();
    const [servingFat, setServingFat] = React.useState();
    const [servingCarbohydrate, setServingCarbohydrate] = React.useState();
    const [servingCost, setServingCost] = React.useState();
    const [timeSinceLastEaten, setTimeSinceLastEaten] = React.useState();

    const createRecipe = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('Recipes')
                .insert([
                    {
                        rec_name: name,
                        rec_serv_count: servingCount,
                        rec_ind_cook_time: indCookTime,
                        rec_total_cook_time: totalCookTime,
                        rec_serv_cal: servingCalories,
                        rec_serv_prot: servingProtein,
                        rec_serv_fat: servingFat,
                        rec_serv_carb: servingCarbohydrate,
                        rec_serv_cost: servingCost,
                        rec_time_since_eaten: timeSinceLastEaten,
                    }
                ]);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateRecipe = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('Recipes')
                .update([
                    {
                        rec_name: name,
                        rec_serv_count: servingCount,
                        rec_ind_cook_time: indCookTime,
                        rec_total_cook_time: totalCookTime,
                        rec_serv_cal: servingCalories,
                        rec_serv_prot: servingProtein,
                        rec_serv_fat: servingFat,
                        rec_serv_carb: servingCarbohydrate,
                        rec_serv_cost: servingCost,
                        rec_time_since_eaten: timeSinceLastEaten,
                    }
                ])
                .select();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const readRecipe = async () => {
            try {
                const response = await supabase
                    .from('Recipes')
                    .select('rec_id, rec_name, rec_serv_count')
                // .range(0, 4)
                const data = response.data;
                setRecipes(data);
            } catch (error) {
                console.error(error);
            }
        };
        readRecipe();
    }, []);

    const deleteRecipe = async (id) => {
        try {
            const response = await supabase
                .from('Recipes')
                .delete()
                .eq('rec_id', id)
            const data = response.data;
            setRecipes(data);
            location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <div>
                <div>
                    <Popup trigger={<button>Add New Recipe</button>} position={"bottom right"}>

                        <form onSubmit={createRecipe} className="add">
                            <h3>Input Recipe Data</h3>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Serving Count" value={servingCount} onChange={(e) => setServingCount(e.target.value)} />
                            <input type="text" placeholder="Ind Cook Time" value={indCookTime} onChange={(e) => setIndCookTime(e.target.value)} />
                            <input type="text" placeholder="Total Cook Time" value={totalCookTime} onChange={(e) => setTotalCookTime(e.target.value)} />
                            <input type="text" placeholder="Total Calories" value={servingCalories} onChange={(e) => setServingCalories(e.target.value)} />
                            <input type="text" placeholder="Total Protein" value={servingProtein} onChange={(e) => setServingProtein(e.target.value)} />
                            <input type="text" placeholder="Total Fat" value={servingFat} onChange={(e) => setServingFat(e.target.value)} />
                            <input type="text" placeholder="Total Carbohydrate" value={servingCarbohydrate} onChange={(e) => setServingCarbohydrate(e.target.value)} />
                            <input type="text" placeholder="Serving Cost" value={servingCost} onChange={(e) => setServingCost(e.target.value)} />
                            <input type="text" placeholder="Time Since Last Eaten" value={timeSinceLastEaten} onChange={(e) => setTimeSinceLastEaten(e.target.value)} />

                            <button type="submit">Add Recipe</button>
                        </form>

                    </Popup>
                    <h3>Your Recipes:</h3>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Servings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.rec_id}>
                                <td>{recipe.rec_name}</td>
                                <td>{recipe.rec_serv_count}</td>

                                <td>
                                    {/* <button>Edit</button> */}
                                    <Popup trigger={<button>Edit</button>} position={"bottom right"}>

                                        <form onSubmit={updateRecipe} className="add">
                                            <h3>Edit Recipe Data</h3>
                                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            <input type="text" placeholder="Serving Count" value={servingCount} onChange={(e) => setServingCount(e.target.value)} />
                                            <input type="text" placeholder="Ind Cook Time" value={indCookTime} onChange={(e) => setIndCookTime(e.target.value)} />
                                            <input type="text" placeholder="Total Cook Time" value={totalCookTime} onChange={(e) => setTotalCookTime(e.target.value)} />
                                            <input type="text" placeholder="Total Calories" value={servingCalories} onChange={(e) => setServingCalories(e.target.value)} />
                                            <input type="text" placeholder="Total Protein" value={servingProtein} onChange={(e) => setServingProtein(e.target.value)} />
                                            <input type="text" placeholder="Total Fat" value={servingFat} onChange={(e) => setServingFat(e.target.value)} />
                                            <input type="text" placeholder="Total Carbohydrate" value={servingCarbohydrate} onChange={(e) => setServingCarbohydrate(e.target.value)} />
                                            <input type="text" placeholder="Serving Cost" value={servingCost} onChange={(e) => setServingCost(e.target.value)} />
                                            <input type="text" placeholder="Time Since Last Eaten" value={timeSinceLastEaten} onChange={(e) => setTimeSinceLastEaten(e.target.value)} />

                                            <button type="submit">Edit Recipe</button>
                                        </form>

                                    </Popup>
                                    <button onClick={() => deleteRecipe(recipe.rec_id)}>Remove</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>

    );
}