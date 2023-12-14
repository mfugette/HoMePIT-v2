import React from "react";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ShoppingList() {
  const [ingredients, setIngredients] = React.useState([]);
  // const [name, setName] = React.useState("");
  // const [quantity, setQuantity] = React.useState();
  // const [threshold, setThreshold] = React.useState();
  const supabase = useSupabaseClient();

  

  useEffect(() => {
    const readIngredient = async () => {
      try {
        const response = await supabase
          .from("Ingredients")
          .select("ing_id, ing_name, ing_qnt, ing_threshold_qnt")
          .lte("ing_qnt", 7);
        const data = response.data;
        //setThreshold(data.ing_threshold_qnt)
        setIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };
    readIngredient();
  }, []);

  return (
    <div>
      <h3>Your Shopping List</h3>

      <Grid item xs={12} md={6}>
        
        <Demo>
          <List sx={{ bgcolor: 'background.paper' }}>
            {ingredients.map((ingredient) => (
              
              <ListItem key={ingredient.ing_id}>
                <ListItemText>
                  {ingredient.ing_name} : {ingredient.ing_qnt}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </div>
  );
}
