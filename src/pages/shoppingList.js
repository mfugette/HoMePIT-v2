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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ShoppingList() {
  const [listIngredients, setListIngredients] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);

  // const [name, setName] = React.useState("");
  // const [quantity, setQuantity] = React.useState();
  // const [threshold, setThreshold] = React.useState();


  const [shoppigLists, setShoppingLists] = React.useState([]);
  const [listId, setListId] = React.useState();
  const [listStartDate, setListStartDate] = React.useState();
  const [listEndDate, setListEndDate] = React.useState();
  const [uid, setUid] = React.useState();

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);


  const supabase = useSupabaseClient();
  supabase.auth.getUser().then((value) => {
    try {
      setUid(value.data.user.id);
    } catch { }
  });

  const upsertShoppingList = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from("Shopping Lists").upsert([
        {
          //list_id: listId,
          list_start_date: listStartDate,
          list_end_date: listEndDate,
          user_id: uid
        },
      ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readShoppingLists = async () => {
      try {
        const response = await supabase
          .from("Shopping Lists")
          .select("list_id, list_start_date, list_end_date");
        const data = response.data;
        setShoppingLists(data);
        console.log(await supabase.auth.getUser());
      } catch (error) {
        console.error(error);
      }
    };
    readShoppingLists();
  }, []);

  const deleteShoppingList = async (id) => {
    try {
      const response = await supabase
        .from("Shopping Lists")
        .delete()
        .match({ list_id: id });
      console.log(response.data);
      setShoppingLists(
        shoppigLists.filter((list) => list.list_id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readIngredient = async () => {
      try {
        const response = await supabase
          .from("Ingredients")
          .select("ing_id, ing_name");
        const data = response.data;
        setIngredients(data);
        console.log(await supabase.auth.getUser());
      } catch (error) {
        console.error(error);
      }
    };
    readIngredient();
  }, []);

  useEffect(() => {
    const readListIngredient = async () => {
      try {
        const response = await supabase
          .from("Shopping List Ingredients")
          .select("ing_id, list_id, ing_qnt_to_buy")
        const data = response.data;
        setListIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };
    readListIngredient();
  }, []);



  return (
    <div>
      <div className="centered">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          id="addButton"
        >
          Add New Shopping List
        </Button>
      </div>
      <div className="centered">
        <h3>Your Shopping Lists</h3>
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
          <form onSubmit={upsertShoppingList}>
            <h3>Enter List Data</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="List Start Date"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                selected={listStartDate}
                onChange={(date) => setListStartDate(date)}
              />

              <DatePicker
                label="List End Date"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                selected={listEndDate}
                onChange={(date) => setListEndDate(date)}
              />
            </LocalizationProvider>
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
                  <TableCell>List ID</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">End Date</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shoppigLists.map((list) => (
                  <TableRow
                    key={list.list_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {list.list_id}
                    </TableCell>
                    <TableCell align="right">{list.list_start_date}</TableCell>
                    <TableCell align="right">
                      {list.list_end_date}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          setOpenViewModal(true);
                          setListId(list.list_id);

                        }}
                      >
                        Ingredients
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        onClick={() => deleteShoppingList(list.list_id)}
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
          <h3>Items to Buy</h3>
          <div>
            {listIngredients.map((ingredient) => (
              <div key={ingredient.ing_id}>
                <p>Name: {ingredient.ing_name}</p>
                <p>Quantity: {ingredient.ing_qnt_to_buy}</p>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
