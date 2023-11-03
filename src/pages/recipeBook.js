import RecipeAddForm from '@/components/recipeComponents/recipeAddForm';
import React from 'react';



export default function RecipeBook() {


    const [recipes, setRecipes] = React.useState([]);

    const handleAddRecipe = (
        name,
        servingCount,
        cookTime,
        macrosPerServing,
        predictedExpiry,
        timeSinceLastCooked,
        userTags,
        ingredients
    ) => {

        const recipe = {
            id: self.crypto.randomUUID(),
            name,
            servingCount,
            cookTime,
            macrosPerServing,
            predictedExpiry,
            timeSinceLastCooked,
            userTags,
            ingredients
        };
        setRecipes([...recipes, recipe]);
    }
    return (
        <div>
            <h1>RecipeBook</h1>

        <RecipeAddForm onAddRecipe={handleAddRecipe}></RecipeAddForm>

        </div>
    );

}