import React from 'react';
import Pantry from './pantry';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
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
import { DataGrid } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

function ViewIngredientsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const supabase = useSupabaseClient();
    const [ingredients, setIngredients] = React.useState([]);

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

    const readIngredients = async () => {
        try {
            const response = await supabase
                .from('Ingredients')
                .select('ing_id, ing_name')
            const data = response.data;
            setIngredients(data);
            console.log(await supabase.auth.getUser())
        } catch (error) {
            console.error(error);
        }
    };
    readIngredients();

    return (
        <div sx={{ overflow: "auto" }}>
            <div sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Button variant="outline" color="primary" onClick={handleOpen} >Ingredients</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '20%' }}>Ingredients:</TableCell>
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

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

function getRecipeIngredientsFromPantry() {

}


export default function RecipeBook() {

    const [recipes, setRecipes] = React.useState([]);
    const [name, setName] = React.useState('');
    const [servingCount, setServingCount] = React.useState();
    const [indCookTime, setIndCookTime] = React.useState();
    const [totalCookTime, setTotalCookTime] = React.useState();
    const [servingCalories, setServingCalories] = React.useState();
    const [servingProtein, setServingProtein] = React.useState();
    const [servingFat, setServingFat] = React.useState();
    const [servingCarbohydrate, setServingCarbohydrate] = React.useState();
    const [servingCost, setServingCost] = React.useState();
    const [timeSinceLastEaten, setTimeSinceLastEaten] = React.useState();
    const [uid, setUid] = React.useState();

    const [recipeIngredients, setRecipeIngredients] = React.useState([]);
    const [recIngName, setRecIngName] = React.useState('');
    const [recIngQnt, setRecIngQnt] = React.useState();
    const [recIngTotalCal, setRecIngTotalCal] = React.useState([]);
    const [recIngTotalProt, setRecIngTotalProt] = React.useState('');
    const [recIngTotalFat, setRecIngTotalFat] = React.useState();
    const [recIngTotalCarb, setRecIngTotalCarb] = React.useState();
    const [recIngTotalCost, setRecIngTotalCost] = React.useState();

    const [open, setOpen] = React.useState(false);
    const handleAddOpen = () => setOpen(true);
    const handleAddClose = () => setOpen(false);
    const handleEditOpen = () => setOpen(true);
    const handleEditClose = () => setOpen(false);

    const supabase = useSupabaseClient();

    const ings = []

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

    const createRecipe = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('Recipes')
                .insert([
                    {
                        rec_name: name,
                        rec_serv_count: servingCount,
                        rec_ind_cook_time: indCookTime,
                        rec_total_cook_time: totalCookTime,
                        rec_serv_cal: servingCalories,
                        rec_serv_prot: servingProtein,
                        rec_serv_fat: servingFat,
                        rec_serv_carb: servingCarbohydrate,
                        rec_serv_cost: servingCost,
                        rec_time_since_eaten: timeSinceLastEaten,
                        user_id: uid
                    }
                ]);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateRecipe = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('Recipes')
                .update([
                    {
                        rec_name: name,
                        rec_serv_count: servingCount,
                        rec_ind_cook_time: indCookTime,
                        rec_total_cook_time: totalCookTime,
                        rec_serv_cal: servingCalories,
                        rec_serv_prot: servingProtein,
                        rec_serv_fat: servingFat,
                        rec_serv_carb: servingCarbohydrate,
                        rec_serv_cost: servingCost,
                        rec_time_since_eaten: timeSinceLastEaten,
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
        const readRecipe = async () => {
            try {
                const response = await supabase
                    .from('Recipes')
                    .select('rec_id, rec_name, rec_serv_count')
                const data = response.data;
                setRecipes(data);
            } catch (error) {
                console.error(error);
            }
        };
        readRecipe();
    }, []);

    const deleteRecipe = async (id) => {
        try {
            const response = await supabase
                .from('Recipes')
                .delete()
                .eq('rec_id', id)
            const data = response.data;
            setRecipes(data);
            location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const createRecipeIngredient = async (e) => {
        e.preventDefault();
        try {
            const response = await supabase
                .from('Ingredients')
                .select('ing_id, ing_name, ing_serv_qnt, ing_serv_cal, ing_serv_prot, ing_serv_carb, ing_serv_fat')
                setRecIngName(ing_name = recIngName);
                setRecIngQnt(ing_serv_qnt = recIngQnt);
                setRecIngTotalCal(ing_serv_cal = recIngTotalCal);
                setRecIngTotalCarb(ing_serv_carb = recIngTotalCarb)
                setRecIngTotalProt(ing_serv_prot = recIngTotalProt);
                setRecIngTotalFat(ing_serv_fat = recIngTotalFat);
            const { data = response.data } = await supabase
                .from('Recipe Ingredients')
                .insert([
                    {
                        ing_qnt: recIngQnt,
                        ing_total_cal: recIngTotalCal,
                        ing_total_prot: recIngTotalProt,
                        ing_total_fat: recIngTotalFat,
                        ing_total_carb: recIngTotalCarb,
                        user_id: uid,
                    }
                ]);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleAddOpen} >Add New Recipe</Button>
            <h3>Your Recipes:</h3>
            <Modal
                open={open}
                onClose={handleAddClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={createRecipe} className="add">
                        <h3>Input Recipe Data</h3>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Serving Count" value={servingCount} onChange={(e) => setServingCount(e.target.value)} />
                        <input type="text" placeholder="Ind Cook Time" value={indCookTime} onChange={(e) => setIndCookTime(e.target.value)} />
                        <input type="text" placeholder="Total Cook Time" value={totalCookTime} onChange={(e) => setTotalCookTime(e.target.value)} />
                        <label>Ingredients:</label>
                        <FormControl sx={{ m: 1, width: 187, mt: 3 }}>
                            <Select multiple value={ings}>
                                <MenuItem disabled>
                                    <em>Placeholder</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        {/* <input type="text" placeholder="Total Calories" value={servingCalories} onChange={(e) => setServingCalories(e.target.value)} />
                        <input type="text" placeholder="Total Protein" value={servingProtein} onChange={(e) => setServingProtein(e.target.value)} />
                        <input type="text" placeholder="Total Fat" value={servingFat} onChange={(e) => setServingFat(e.target.value)} />
                        <input type="text" placeholder="Total Carbohydrate" value={servingCarbohydrate} onChange={(e) => setServingCarbohydrate(e.target.value)} />
                        <input type="text" placeholder="Serving Cost" value={servingCost} onChange={(e) => setServingCost(e.target.value)} />
                        <input type="text" placeholder="Time Since Last Eaten" value={timeSinceLastEaten} onChange={(e) => setTimeSinceLastEaten(e.target.value)} /> */}

                        <button type="submit">Add Recipe</button>
                    </form>
                </Box>
            </Modal>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Recipe</TableCell>
                                <TableCell align="right">Servings</TableCell>
                                <TableCell>Ingredients</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipes.map((recipe) => (
                                <TableRow
                                    key={recipe.rec_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {recipe.rec_name}
                                    </TableCell>
                                    <TableCell align="right">{recipe.rec_serv_count}</TableCell>
                                    <TableCell>
                                        <ViewIngredientsModal />
                                    </TableCell>
                                    <TableCell align="right"><Button color="info" onClick={handleEditOpen}><EditNoteIcon /></Button></TableCell>
                                    <TableCell align="right"><Button color="error" onClick={() => deleteRecipe(recipe.rec_id)}><DeleteIcon /></Button></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}