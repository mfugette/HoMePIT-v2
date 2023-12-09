import React from 'react';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, Button, Modal, TextField, InputLabel, Select, OutlinedInput, MenuProps, MenuItem, Checkbox, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function RecipeBook() {
    const [recipes, setRecipes] = React.useState([]);
    const [recipeName, setRecipeName] = React.useState('');
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

    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const [recipeIngredients, setRecipeIngredients] = React.useState([]);
    const [recipeIngID, setRecIngID] = React.useState();
    const [recIngName, setRecIngName] = React.useState('');
    const [recIngQnt, setRecIngQnt] = React.useState();
    const [recIngTotalCal, setRecIngTotalCal] = React.useState([]);
    const [recIngTotalProt, setRecIngTotalProt] = React.useState('');
    const [recIngTotalFat, setRecIngTotalFat] = React.useState();
    const [recIngTotalCarb, setRecIngTotalCarb] = React.useState();
    const [recIngTotalCost, setRecIngTotalCost] = React.useState();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRecIngName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const supabase = useSupabaseClient();
    supabase.auth.getUser().then(value => {
        try {
            setUid(value.data.user.id)
        } catch { }
    })

    // const readIngredients = async () => {
    //     try {
    //         const response = await supabase
    //             .from('Ingredients')
    //             .select('ing_id, ing_name')
    //         const data = response.data;
    //         setRecipeIngredients(data);
    //         await supabase.auth.getUser()
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // readIngredients();

    React.useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await supabase
                    .from('Recipes')
                    .select('rec_id, rec_name, rec_serv_count');
                const data = response.data;
                setRecipes(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipes();
    }, []);

    // React.useEffect(() => {
    //     const fetchIngredients = async () => {
    //         try {
    //             const response = await supabase
    //                 .from('Ingredients')
    //                 .select('ing_id, ing_name');
    //             const data = response.data;
    //             setRecipeIngredients(data);
    //         } catch (error) {
    //             console.error(error);
    //         }

    //     };

    //     fetchIngredients();
    // }, []);

    const createRecipe = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('Recipes')
                .insert([
                    {
                        rec_name: recipeName,
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

    // const createRecipeIngredient = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await supabase
    //             .from('Recipe Ingredients')
    //             .insert([
    //                 {
    //                     rec_id: recipeID,
    //                     ing_id: recipeIngID,
    //                     ing_qnt: recIngQnt,
    //                     ing_total_cal: recIngTotalCal,
    //                     ing_total_prot: recIngTotalProt,
    //                     ing_total_fat: recIngTotalFat,
    //                     ing_total_carb: recIngTotalCarb,
    //                     ing_total_cost: recIngTotalCost,
    //                     user_id: uid
    //                 }
    //             ]);
    //         return data;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleAddRecipe = async (event) => {
    //     event.preventDefault();

    //     const newRecipe = {
    //         rec_name: recipeName,
    //         rec_serv_count: recipeServings,
    //         rec_ind_cook_time: recipeCookTime,
    //         rec_total_cook_time: recipeTotalCookTime,
    //     };

    //     try {
    //         const response = await supabase
    //             .from('Recipes')
    //             .insert([newRecipe]);
    //         console.log(response.data);

    //         setRecipes([...recipes, response.data[0]]);
    //         setOpenAddModal(false);
    //         // Clear the form data after successful addition
    //         setNewRecipeData({
    //             name: '',
    //             servingCount: '',
    //             cookTime: '',
    //             totalCookTime: '',
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleEditRecipe = async (event) => {
    //     event.preventDefault();

    //     const updatedRecipe = {
    //         // ... updated recipe details
    //     };

    //     try {
    //         const response = await supabase.from('Recipes').update([updatedRecipe]).match({ rec_id: event.target.rec_id.value });
    //         console.log(response.data);
    //         setRecipes(recipes.map((recipe) => (recipe.rec_id === updatedRecipe.rec_id ? updatedRecipe : recipe)));
    //         setOpenEditModal(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const deleteRecipe = async (id) => {
        try {
            const response = await supabase
                .from('Recipes')
                .delete()
                .match({ rec_id: id });
            console.log(response.data);
            setRecipes(recipes.filter((recipe) => recipe.rec_id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='centered'>
                <Button id='addButton' variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
                    Add New Recipe
                </Button>
            </div>
            <div className='centered'>
                <h3>Your Recipes</h3>
            </div>
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
                            <TableRow key={recipe.rec_id}>
                                <TableCell component="th" scope="row">
                                    {recipe.rec_name}
                                </TableCell>
                                <TableCell align="right">{recipe.rec_serv_count}</TableCell>
                                <TableCell>View Ingredients</TableCell>
                                <TableCell align="right">
                                    <Button color="info" onClick={() => setOpenEditModal(true)}>
                                        <EditNoteIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color="error" onClick={() => deleteRecipe(recipe.rec_id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Recipe Modal */}
            <Modal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <h2>Add New Recipe</h2>
                    <form onSubmit={createRecipe}>
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
                            // required
                            value={servingCount}
                            onChange={(e) => setServingCount(e.target.value)}
                        />
                        <TextField
                            label="Cook Time"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            // required
                            value={totalCookTime}
                            onChange={(e) => setTotalCookTime(e.target.value)}
                        />
                        <InputLabel id="demo-multiple-checkbox-label">Ingredients</InputLabel>
                        {/* <Select
                            labelId="demo-multiple-checkbox-label"
                            id=""
                            multiple
                            fullWidth
                            value={recipeIngredients}
                            onChange={handleChange}
                            input={<OutlinedInput label="Ingredients" />}
                            renderValue={(selectedIngredients) => selectedIngredients.map((ing) => ing.ing_name).join(', ')} // Render ingredient names
                            MenuProps={MenuProps}
                        >
                            {recipeIngredients.map((ingredient) => (
                                <MenuItem key={ingredient.ing_id} value={ingredient.ing_name}>
                                    <Checkbox checked={recipeIngredients.includes(ingredient.ing_id)} />
                                    <ListItemText primary={ingredient.ing_name} />
                                </MenuItem>
                            ))}
                        </Select> */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add Recipe
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
