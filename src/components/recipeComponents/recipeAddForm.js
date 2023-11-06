import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function RecipeAddForm({ onAddRecipe }) {
    const [name, setName] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRecipe(
           
            );

        setName('');
      
    }

    return (

        <Popup trigger={<button>Add New Recipe</button>} position={"bottom right"}>

            <form onSubmit={handleSubmit} className="add">
                <h3>Input Recipe</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Add Recipe</button>
            </form>

        </Popup>

    )
}
