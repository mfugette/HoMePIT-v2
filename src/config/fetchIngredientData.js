import supabase from "./supabaseClient";


let { data: Ingredients, error } = await supabase
    .from('Ingredients')
    .select('ing_id')

export default function ing() {
    return (
        <>
        
        </>
    )
}