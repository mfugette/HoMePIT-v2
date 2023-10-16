import React from "react";

//import { useState } from "react"

//const [ingredientQuantity, setIngredientQuantity] = React.useState(0);

export default function IngredientAddForm({onAddIngredient}) {
    const [name, setName] = React.useState("");
    const [quantity, setQuantity] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddIngredient(name, quantity);
        setName("");
        setQuantity(0);
        console.log(name)
    }

    return (
        <form onSubmit={handleSubmit} className="add">
            <h3>Add Ingredient</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <button type="submit">Add Ingredient</button>

        </form>
    )
}
