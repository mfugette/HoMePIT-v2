//import React from "react";
import supabase from "@/config/supabaseClient";

export default function Test() {

    const addTo = async () => {
        try {
            const { data } = await supabase
                .from('Ingredients')
                .insert([
                    { ing_qnt: '5', ing_name: 'Cheese, Cheddar' },
                    { ing_qnt: '2', ing_name: 'Butter, Salted' },
                    { ing_qnt: '12', ing_name: 'Eggs, Large' },
                    { ing_qnt: '50', ing_name: 'Blueberries' },
                    { ing_qnt: '12', ing_name: 'Potatoes, Russet' },
                    { ing_qnt: '1', ing_name: 'Oatmeal' },
                    { ing_qnt: '2', ing_name: 'Salmon' },
                    { ing_qnt: '30', ing_name: 'Wasabi' },
                    { ing_qnt: '5', ing_name: 'Bananas' },
                ]);


            return data;

        } catch (error) {
            console.error(error);
        }
    };
    //console.log(supabase)

    return (
        <>
            <div>
                <button onClick={addTo}>Test</button>
            </div>
        </>
    )


}