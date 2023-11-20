import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect } from 'react';

export default function MealPlanner() {
  const [meals, setMeals] = React.useState([]);
  const [mealType, setMealType] = React.useState('');
  const [mealDateTime, setMealDateTime] = React.useState();
  const [mealCookTime, setMealCookTime] = React.useState();
  const [mealServingCount, setMealServingCount] = React.useState();
  const [uid, setUid] = React.useState();


  const createMeal = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Meals')
        .insert([
          {
            meal_type: mealType,
            meal_date_time: mealDateTime,
            meal_time_start_cook: mealCookTime,
            meal_serv_count: mealServingCount,
            user_id: uid,
          }
        ]);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateMeal = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from('Meals')
        .update([
          {
            meal_type: mealType,
            meal_date_time: mealDateTime,
            meal_time_start_cook: mealCookTime,
            meal_serv_count: mealServingCount,
            user_id: uid,
          }
        ])
        .select();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readMeal = async () => {
      try {
        const response = await supabase
          .from('Meals')
          .select('meal_type, meal_time_start_cook, meal_serv_count')
        // .range(0, 4)
        const data = response.data;
        setMeals(data);
      } catch (error) {
        console.error(error);
      }
    };
    readMeal();
  }, []);

  const deleteMeal = async (id) => {
    try {
      const response = await supabase
        .from('Meals')
        .delete()
        .eq('meal_id', id)
      const data = response.data;
      setMeals(data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h1>MealPlanner</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </div>

  );
}