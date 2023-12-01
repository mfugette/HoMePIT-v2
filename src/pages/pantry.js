import React from 'react';
import { useEffect } from 'react';
//import supabase from '@/config/supabaseClient.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Box, Button, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Pantry() {

  const [ingredients, setIngredients] = React.useState([]);
  const [name, setName] = React.useState('');
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

  const [open, setOpen] = React.useState(false);
  const handleOpenAdd = () => setOpen(true);
  const handleCloseAdd = () => setOpen(false);
  const handleOpenEdit = () => setOpen(true);
  const handleCloseEdit = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 260,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  supabase.auth.getUser().then(value => {
    try {
      setUid(value.data.user.id)
    } catch { }
  })

  const createIngredient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Ingredients')
        .insert([
          {
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
            user_id: uid
          }
        ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateIngredient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Ingredients')
        .update([
          {
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
            user_id: uid
          }
        ])
        .select();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readIngredient = async () => {
      try {
        const response = await supabase
          .from('Ingredients')
          .select('ing_id, ing_name, ing_qnt')
        // .range(0, 4)
        const data = response.data;
        setIngredients(data);
        console.log(await supabase.auth.getUser())
      } catch (error) {
        console.error(error);
      }
    };
    readIngredient();
  }, []);

  const deleteIngredient = async (id) => {
    try {
      const response = await supabase
        .from('Ingredients')
        .delete()
        .eq('ing_id', id)
      const data = response.data;
      setIngredients(data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenAdd} >Add New Ingredient</Button>
      <h3>Your Ingredients:</h3>
      <Modal
        open={open}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={createIngredient} className="add">
            <h3>Input Food</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            <input type="text" placeholder="Serving Size" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
            <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <input type="text" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <input type="text" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
            <input type="text" placeholder="Carbohydrate" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
            <input type="text" placeholder="Purchased Servings" value={purchasedServings} onChange={(e) => setPurchasedServings(e.target.value)} />
            <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />

            <Button variant="contained" color="primary" type="submit">Add Ingredient</Button>
          </form>
        </Box>
      </Modal>
      <div sx={{ overflow: "auto" }}>
        <div sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{width: '20%'}}>Ingredient</TableCell>
                <TableCell style={{width: '20%'}} align="right">Quantity</TableCell>
                <TableCell style={{width: '20%'}} >Units</TableCell>
                <TableCell style={{width: '20%'}} align="right">Edit</TableCell>
                <TableCell style={{width: '20%'}} align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow
                  key={ingredient.ing_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ingredient.ing_name}
                  </TableCell>
                  <TableCell align="right">{ingredient.ing_qnt}</TableCell>
                  <TableCell align="right">{ingredient.ing_serv_cal}</TableCell>
                  <TableCell align="right"><Button color="info" onClick={handleOpenEdit}><EditNoteIcon /></Button></TableCell>
                  <TableCell align="right"><Button color="error" onClick={() => deleteIngredient(ingredient.ing_id)}><DeleteIcon /></Button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={updateIngredient} className="edit">
            <h3>Edit Food</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="text" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            <input type="text" placeholder="Serving Size" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
            <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <input type="text" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <input type="text" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
            <input type="text" placeholder="Carbohydrate" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
            <input type="text" placeholder="Purchased Servings" value={purchasedServings} onChange={(e) => setPurchasedServings(e.target.value)} />
            <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />

            <Button variant="contained" color="primary" type="submit">Add Ingredient</Button>
          </form>
        </Box>
      </Modal> */}

    </div>




  );
};
