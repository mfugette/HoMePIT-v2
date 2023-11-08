import supabase from "./supabaseClient"


export default async function foofData() {

    const { error } = await supabase
      .from('Ingredients')
      .select("")
}