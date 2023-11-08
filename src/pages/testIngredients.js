//import React from "react";
import supabase from "@/config/supabaseClient";

export default function Test() {

    const addTo = async () => {
        try {
            const { data } = await supabase
                .from('Ingredients')
                .insert([
                    { ing_id: '666', ing_name: 'Test' },
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