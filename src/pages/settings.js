import * as React from "react";
import {
  FormGroup,
  FormHelperText,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Button,
  InputLabel
} from "@mui/material";

export default function Settings() {
  const [regularShoppingTrip, setRegularShoppingTrip] = React.useState(true);
  const [preferredShoppingDay, setPreferredShoppingDay] = React.useState("");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const handleChangeShoppingDay = (event) => {
    setPreferredShoppingDay(event.target.value);
  };

  const handleSaveSettings = () => {
    console.log("Settings saved successfully!");
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={regularShoppingTrip}
            onChange={(event) => setRegularShoppingTrip(event.target.checked)}
          />
        }
        label="Enable Regular Shopping Trips"
      />
      {regularShoppingTrip && (
        <>
          <InputLabel>Preferred Shopping Day</InputLabel>
          <FormControlLabel
            control={
              <Select
                fullWidth
                label="Preferred Shopping Day"
                value={preferredShoppingDay}
                onChange={handleChangeShoppingDay}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            }
          />
          <FormHelperText>
            Select the day you prefer to do your regular shopping.
          </FormHelperText>
        </>
      )}
      <Button variant="contained" type="button" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </FormGroup>
  );
}
