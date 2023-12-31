import React from "react";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Button,
  Modal,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  MenuProps,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function RecipeBook() {
  const [recipes, setRecipes] = React.useState([]);
  const [recipeName, setRecipeName] = React.useState("");
  const [servingCount, setServingCount] = React.useState();
  const [indCookTime, setIndCookTime] = React.useState(0); // set as equat to total cook time
  const [totalCookTime, setTotalCookTime] = React.useState();
  const [servingCalories, setServingCalories] = React.useState();
  const [servingProtein, setServingProtein] = React.useState();
  const [servingFat, setServingFat] = React.useState();
  const [servingCarbohydrate, setServingCarbohydrate] = React.useState();
  const [servingCost, setServingCost] = React.useState();
  const [timeSinceLastEaten, setTimeSinceLastEaten] = React.useState();
  const [uid, setUid] = React.useState();

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [recipeIngredients, setRecipeIngredients] = React.useState([]);
  // const [recipeIngID, setRecIngID] = React.useState();
  // const [recIngName, setRecIngName] = React.useState("");
  // const [recIngQnt, setRecIngQnt] = React.useState();
  // const [recIngTotalCal, setRecIngTotalCal] = React.useState();
  // const [recIngTotalProt, setRecIngTotalProt] = React.useState();
  // const [recIngTotalFat, setRecIngTotalFat] = React.useState();
  // const [recIngTotalCarb, setRecIngTotalCarb] = React.useState();
  // const [recIngTotalCost, setRecIngTotalCost] = React.useState();

  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = React.useState([]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [editRecipeId, setEditRecipeId] = React.useState(getRandomInt(1, 9999));

  // const handleChange = (e) => {
  //   const {
  //     target: { value },
  //     checked,
  //   } = e;
  //   const selectedIngredientId = value;

  //   if (checked) {
  //     setSelectedIngredients([...selectedIngredients, selectedIngredientId]);
  //   } else {
  //     setSelectedIngredients(
  //       selectedIngredients.filter((id) => id !== selectedIngredientId)
  //     );
  //   }
  // };

  const supabase = useSupabaseClient();
  supabase.auth.getUser().then((value) => {
    try {
      setUid(value.data.user.id);
    } catch {}
  });

  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await supabase
          .from("Recipes")
          .select(
            "rec_id, rec_name, rec_serv_count, rec_serv_cal, rec_serv_prot, rec_serv_fat, rec_serv_carb, rec_serv_cost"
          );
        const data = response.data;
        setRecipes(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await supabase
          .from("Ingredients")
          .select(
            "ing_id, ing_name, ing_qnt, ing_serv_cal, ing_serv_prot, ing_serv_fat, ing_serv_carb, ing_purchase_serv_cnt, ing_purchase_cost"
          );
        const data = response.data;
        setRecipeIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, []);

  const createRecipeIngredient = async (recipeId, ingId, qnt) => {
    try {
      const { data } = await supabase.from("Recipe Ingredients").upsert([
        {
          rec_id: recipeId,
          ing_id: ingId,
          ing_qnt: qnt,
          user_id: uid,
        },
      ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const upsertRecipe = async (e) => {
    e.preventDefault();

    try {
      const { data } = await supabase.from("Recipes").upsert([
        {
          rec_id: editRecipeId,
          rec_name: recipeName,
          rec_serv_count: servingCount,
          rec_ind_cook_time: indCookTime,
          rec_total_cook_time: totalCookTime,
          // rec_serv_cal: servingCalories,
          // rec_serv_prot: servingProtein,
          // rec_serv_fat: servingFat,
          // rec_serv_carb: servingCarbohydrate,
          // rec_serv_cost: servingCost,
          rec_time_since_eaten: timeSinceLastEaten,
          user_id: uid,
        },
      ]);

      if (recipeIngredients.length) {
        for (const ingredient of recipeIngredients) {
          await createRecipeIngredient(
            editRecipeId,
            ingredient.ing_id,
            ingredient.ing_qnt
          );
        }
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await supabase
        .from("Recipes")
        .delete()
        .match({ rec_id: id });
      console.log(response.data);
      setRecipes(recipes.filter((recipe) => recipe.rec_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await supabase
          .from("Recipe Ingredients")
          .select(
            "rec_id, ing_total_cal, ing_total_prot, ing_total_carb, ing_total_fat, ing_total_cost"
          );
        const data = response.data;
        //setRecipeIngredients(data);
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNutritionData();
  }, []);

  return (
    <div>
      <div className="centered">
        <Button
          id="addButton"
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
        >
          Add New Recipe
        </Button>
      </div>
      <div className="centered">
        <h3>Your Recipes</h3>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Recipe</TableCell>
              <TableCell align="right">Servings</TableCell>
              <TableCell>Nutrition Facts</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.rec_id}>
                <TableCell component="th" scope="row">
                  {recipe.rec_name}
                </TableCell>
                <TableCell align="right">{recipe.rec_serv_count}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setOpenViewModal(true);

                      //setIndCookTime(0);
                      setServingCalories(recipe.rec_serv_cal);
                      setServingProtein(recipe.rec_serv_prot);
                      setServingFat(recipe.rec_serv_fat);
                      setServingCarbohydrate(recipe.rec_serv_carb);
                      setServingCost(recipe.rec_serv_cost);
                    }}
                  >
                    Nutrition
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="info"
                    onClick={() => {
                      setOpenAddModal(true);
                      setRecipeName(recipe.rec_name);
                      setServingCount(recipe.rec_serv_count);
                      setTotalCookTime(recipe.rec_total_cook_time);

                      setEditRecipeId(recipe.rec_id);
                    }}
                  >
                    <EditNoteIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={() => deleteRecipe(recipe.rec_id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Recipe Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Input Recipe Data</h3>
          <form onSubmit={upsertRecipe}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <TextField
              label="Servings"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingCount}
              onChange={(e) => setServingCount(e.target.value)}
            />
            <TextField
              label="Total Cook Time"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={totalCookTime}
              onChange={(e) => setTotalCookTime(e.target.value)}
            />
            {/* <TextField
              label="Cook Time"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={indCookTime}
              onChange={(e) => setIndCookTime(e.target.value)}
            /> */}
            {/* <TextField
              label="Calories per Serving"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingCalories}
              onChange={(e) => setServingCalories(e.target.value)}
            />
            <TextField
              label="Protein per Serving"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingProtein}
              onChange={(e) => setServingProtein(e.target.value)}
            />
            <TextField
              label="Fat per Serving"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingFat}
              onChange={(e) => setServingFat(e.target.value)}
            />
            <TextField
              label="Carbs per Serving"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingCarbohydrate}
              onChange={(e) => setServingCarbohydrate(e.target.value)}
            />
            <TextField
              label="Cost per Serving"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={servingCost}
              onChange={(e) => setServingCost(e.target.value)}
            /> */}
            <TextField
              label="Time Since Last Eaten"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={timeSinceLastEaten}
              onChange={(e) => setTimeSinceLastEaten(e.target.value)}
            />
            <InputLabel id="demo-multiple-checkbox-label">
              Ingredients
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id=""
              multiple
              fullWidth
              value={selectedIngredients}
              onChange={(event) => {
                const newSelectedIngredients = [...event.target.value];
                if (newSelectedIngredients.includes(event.target.value)) {
                  newSelectedIngredients.splice(
                    newSelectedIngredients.indexOf(event.target.value),
                    1
                  );
                } else {
                  newSelectedIngredients.push(event.target.value);
                }
                setSelectedIngredients(newSelectedIngredients);
              }}
              input={<OutlinedInput label="Ingredients" />}
              renderValue={(selectedIngredients) =>
                selectedIngredients
                  .map((id) => {
                    const ingredient = recipeIngredients.find(
                      (ing) => ing.ing_id === id
                    );
                    return ingredient && ingredient.ing_name;
                  })
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {recipeIngredients.map((ingredient) => (
                <MenuItem key={ingredient.ing_id} value={ingredient.ing_id}>
                  <Checkbox
                    checked={selectedIngredients.includes(ingredient.ing_id)}
                  />
                  <ListItemText primary={ingredient.ing_name} />
                </MenuItem>
              ))}
            </Select>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Nutrition Data</h3>
          <div>
            <p>Total Protein: {servingProtein}</p>
            <p>Total Fat: {servingFat}</p>
            <p>Total Carbohydrate: {servingCarbohydrate}</p>
            <p>Total Calories: {servingCalories}</p>
            <p>Total Cost: {servingCost}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}