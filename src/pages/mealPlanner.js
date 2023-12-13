import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
//import { DemoItem } from '@mui/x-date-pickers/internals/demo';

export default function MealPlanner() {
  const [meals, setMeals] = React.useState([]);
  const [mealType, setMealType] = React.useState("");
  const [mealDateTime, setMealDateTime] = React.useState();
  const [mealCookTime, setMealCookTime] = React.useState();
  const [mealServingCount, setMealServingCount] = React.useState();
  const [uid, setUid] = React.useState();

  const [recipes, setRecipes] = React.useState([]);
  const [recipeName, setRecipeName] = React.useState("");
  const [servingCount, setServingCount] = React.useState();

  const [mealRecipes, setMealRecipes] = React.useState([]);

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [selectedRecipes, setSelectedRecipes] = React.useState([]);
  const [selectedMealRecipes, setSelectedMealRecipes] = React.useState([]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [editMealId, setEditMealId] = React.useState(getRandomInt(1, 999));

  const handleChange = (e) => {
    const {
      target: { value },
      checked,
    } = e;
    const selectedRecipeId = value;

    if (checked) {
      setSelectedRecipes([...selectedRecipes, selectedRecipeId]);
    } else {
      setSelectedRecipes(
        selectedRecipes.filter((id) => id !== selectedRecipeId)
      );
    }
  };

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
          .select("rec_id, rec_name, rec_serv_count");
        const data = response.data;
        setRecipes(data);
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  const createMealRecipe = async (mealId, recId, serv) => {
    try {
      const { data } = await supabase.from("Meal Recipes").insert([
        {
          meal_id: mealId,
          rec_id: recId,
          mealId: serv,
          user_id: uid,
        },
      ]);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const upsertMeal = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from("Meals").upsert([
        {
          meal_type: mealType,
          meal_date_time: mealDateTime,
          meal_time_start_cook: mealCookTime,
          meal_serv_count: mealServingCount,
          user_id: uid,
        },
      ]);

      // addEvent = () => {
      //   let newEvent = {
      //     id: data.meal_id,
      //     title: data.meal_type,
      //     color: "#333333",
      //     start: data.meal_time_start_cook,
      //     end: data.meal_date_time,
      //     custom: `Meal ${data.meal_id}`,
      //   };

      //   setState((state) => {
      //     return {
      //       ...state,
      //       externalEvents: state.externalEvents.concat(newEvent),
      //     };
      //   });
      // };

      if (mealRecipes.length) {
        for (const recipe of mealRecipes) {
          await createMealRecipe(
            editMealId,
            recipe.rec_id,
            recipe.meal_serv_to_cook
          );
        }
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readMeal = async () => {
      
      try {
        const response = await supabase
          .from("Meals")
          .select(
            "meal_id, meal_type, meal_time_start_cook, meal_serv_count, meal_date_time"
          );
        const data = response.data;

        const newEvents = data.map((meal, index) => {
          const color = index % 2 === 0 ? "#E07A5F" : "#DAA520";
          return {
            id: meal.meal_id,
            title: meal.meal_type,
            color: color,
            start: meal.meal_time_start_cook,
            end: meal.meal_date_time,
            custom: `Meal ${meal.meal_id}`,
          };
        });
        console.log(newEvents)

        setState((state) => {
          return {
            ...state,
            externalEvents: state.externalEvents.concat(newEvents),
          };
        });
      } catch (error) {
        console.error(error);
      }
    };

    readMeal();
  }, []);


  const deleteMeal = async (id) => {
    try {
      const response = await supabase.from("Meals").delete().eq("meal_id", id);
      const data = response.data;
      setMeals(data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [state, setState] = React.useState({
    weekendsVisible: true,
    externalEvents: [],
  });

  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.dataset.id;
        let title = eventEl.getAttribute("title");
        let color = eventEl.dataset.color;
        let custom = eventEl.dataset.custom;

        return {
          id: id,
          title: title,
          color: color,
          custom: custom,
          create: true,
        };
      },
    });
  });

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      // start: eventInfo.date,
      // end: eventInfo.date,
      custom: eventInfo.draggedEl.getAttribute("data-custom"),
    };

    setState((state) => {
      return {
        ...state,
        calendarEvents: state.calendarEvents.concat(newEvent),
      };
    });
  };

  return (
    <div>
      <div className="centered"></div>
      <div className="Calendar">
        <div style={{ float: "left", width: "25%" }}>
          <div style={{ margin: "0 0 20px" }}>
            <Button
              id="addButton"
              variant="contained"
              color="primary"
              onClick={() => setOpenAddModal(true)}
            >
              Add Meal
            </Button>
          </div>
          <div id="external-events">
            <h4>Your Meals</h4>
            {state.externalEvents.map((event) => (
              <div
                className="fc-event  mb-1 fc-daygrid-event fc-daygrid-block-event"
                title={event.title}
                data-id={event.id}
                data-color={event.color}
                data-custom={event.custom}
                key={event.id}
                style={{
                  backgroundColor: event.color,
                  borderColor: event.color,
                  marginRight: 25,
                  cursor: "pointer",
                }}
              >
                <div>
                  <div>
                    <strong>{event.title}</strong>
                  </div>
                  {event.custom}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ float: "left", width: "75%" }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev, next today",
              center: "title",
              right: "dayGridMonth, timeGridWeek, timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendsVisible}
            events={state.calendarEvents}
            droppable={true}
            eventReceive={handleEventReceive}
          />
        </div>
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
          <h3>Input Meal Data</h3>
          <form onSubmit={upsertMeal}>
            <TextField
              label="Meal Type"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                selected={mealDateTime}
                onChange={(date) => setMealDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="cook time"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                selected={mealCookTime}
                onChange={(date) => setMealCookTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
              />
            </LocalizationProvider>
            {/* <TextField
              label="Cook Time"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={mealCookTime}
              onChange={(e) => setMealCookTime(e.target.value)}
            /> */}
            <TextField
              label="Serving Count"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={mealServingCount}
              onChange={(e) => setMealServingCount(e.target.value)}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            {/* <DemoItem label="Date Time">
                <DateTimeField defaultValue={dayjs("2022-04-17T15:30")} />
              </DemoItem> */}
            {/* </LocalizationProvider> */}

            <InputLabel id="demo-multiple-checkbox-label">Recipes</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id=""
              multiple
              fullWidth
              value={selectedRecipes}
              onChange={(event) => {
                const newSelectedRecipes = [...event.target.value];
                // Add or remove ingredient based on checkbox state ?????
                if (newSelectedRecipes.includes(event.target.value)) {
                  newSelectedRecipes.splice(
                    newSelectedRecipes.indexOf(event.target.value),
                    1
                  );
                } else {
                  newSelectedRecipes.push(event.target.value);
                }
                setSelectedIngredients(newSelectedRecipes);
              }}
              input={<OutlinedInput label="Recipes" />}
              renderValue={(selectedRecipes) =>
                selectedRecipes
                  .map((id) => {
                    const recipe = mealRecipes.find((rec) => rec.rec_id === id);
                    return recipe && recipe.rec_name;
                  })
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {mealRecipes.map((recipe) => (
                <MenuItem key={recipe.rec_id} value={recipe.rec_id}>
                  <Checkbox checked={selectedRecipes.includes(recipe.rec_id)} />
                  <ListItemText primary={recipe.rec_name} />
                </MenuItem>
              ))}
            </Select>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
