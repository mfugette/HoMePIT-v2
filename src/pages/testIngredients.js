//import React from "react";
import supabase from "@/config/supabaseClient";

export default function Test() {

    const addTo = async () => {
        try {
            const { data } = await supabase
                .from('Ingredients')
                .insert([
                    { ing_qnt: '453', ing_name: 'frsd' },
                    { ing_qnt: '45', ing_name: 'sfer' },
                    { ing_qnt: '534', ing_name: 'sger' },
                    { ing_qnt: '342', ing_name: 'eas' },
                    { ing_qnt: '87', ing_name: 'hert' },
                    { ing_qnt: '5', ing_name: 'sgrd' },
                    { ing_qnt: '54', ing_name: 'hdrt' },
                    { ing_qnt: '4', ing_name: 'afr' },
                    { ing_qnt: '76', ing_name: 'jyfgt' },
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