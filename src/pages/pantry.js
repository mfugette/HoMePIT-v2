import React from "react";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Button,
  Modal,
  TextField,
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Pantry() {
  const [ingredients, setIngredients] = React.useState([]);
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState();
  const [threshold, setThreshold] = React.useState();
  const [servingSize, setServingSize] = React.useState();
  const [calories, setCalories] = React.useState();
  const [protein, setProtein] = React.useState();
  const [fat, setFat] = React.useState();
  const [carbohydrate, setCarbohydrate] = React.useState();
  const [purchasedServings, setPurchasedServings] = React.useState();
  const [cost, setCost] = React.useState();
  const [uid, setUid] = React.useState();

  const supabase = useSupabaseClient();

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [editIngredientId, setEditIngredientId] = React.useState(
    getRandomInt(1, 9999)
  );

  supabase.auth.getUser().then((value) => {
    try {
      setUid(value.data.user.id);
    } catch {}
  });

  const upsertIngredient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from("Ingredients").upsert([
        {
          ing_id: editIngredientId,
          ing_name: name,
          ing_qnt: quantity,
          ing_threshold_qnt: threshold,
          ing_serv_qnt: servingSize,
          ing_serv_cal: calories,
          ing_serv_prot: protein,
          ing_serv_fat: fat,
          ing_serv_carb: carbohydrate,
          ing_purchase_serv_cnt: purchasedServings,
          ing_purchase_cost: cost,
          user_id: uid,
        },
      ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readIngredient = async () => {
      try {
        const response = await supabase
          .from("Ingredients")
          .select("ing_id, ing_name, ing_qnt");
        const data = response.data;
        setIngredients(data);
        console.log(await supabase.auth.getUser());
      } catch (error) {
        console.error(error);
      }
    };
    readIngredient();
  }, []);

  const deleteIngredient = async (id) => {
    try {
      const response = await supabase
        .from("Ingredients")
        .delete()
        .match({ ing_id: id });
      console.log(response.data);
      setIngredients(
        ingredients.filter((ingredient) => ingredient.ing_id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="centered">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          id="addButton"
        >
          Add New Ingredient
        </Button>
      </div>

      <div className="centered">
        <h3>Your Ingredients</h3>
      </div>
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
          <form onSubmit={upsertIngredient}>
            <h3>Input Food Data</h3>
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Serving Size"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Fat"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Carbohydrate"
              value={carbohydrate}
              onChange={(e) => setCarbohydrate(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Purchased Servings"
              value={purchasedServings}
              onChange={(e) => setPurchasedServings(e.target.value)}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <div sx={{ overflow: "auto" }}>
        <div sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell>Nutrition Facts</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <TableRow
                    key={ingredient.ing_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {ingredient.ing_id}: {ingredient.ing_name}
                    </TableCell>
                    <TableCell align="right">{ingredient.ing_qnt}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          setOpenViewModal(true);

                          setCalories(ingredient.ing_serv_cal);
                          setProtein(ingredient.ing_serv_prot);
                          setFat(ingredient.ing_serv_fat);
                          setCarbohydrate(ingredient.ing_serv_carb);
                          setPurchasedServings(
                            ingredient.ing_purchase_serv_cnt
                          );
                          setCost(ingredient.ing_purchase_cost);
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
                          setName(ingredient.ing_name);
                          setQuantity(ingredient.ing_qnt);
                          setThreshold(ingredient.ing_threshold_qnt);
                          setServingSize(ingredient.ing_serv_qnt);
                          setCalories(ingredient.ing_serv_cal);
                          setProtein(ingredient.ing_serv_prot);
                          setFat(ingredient.ing_serv_fat);
                          setCarbohydrate(ingredient.ing_serv_carb);
                          setPurchasedServings(
                            ingredient.ing_purchase_serv_cnt
                          );
                          setCost(ingredient.ing_purchase_cost);
                          setEditIngredientId(ingredient.ing_id);
                        }}
                      >
                        <EditNoteIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        onClick={() => deleteIngredient(ingredient.ing_id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
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
            <p>Total Protein: {protein}</p>
            <p>Total Fat: {fat}</p>
            <p>Total Carbohydrate: {carbohydrate}</p>
            <p>Total Calories: {calories}</p>
            <p>Total Cost: {cost}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
