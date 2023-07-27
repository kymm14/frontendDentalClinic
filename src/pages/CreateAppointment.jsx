import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";

// @MUI
import { Box, Button } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// @MUI/X
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function CreateAppointment() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState({});
  const [appointments, setAppointments] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [timeValue, setTime] = React.useState([]);
  const [date, setDate] = React.useState([]);
  const theme = useTheme();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getDoctors();
  }, []);

  const handleClickSaveAppointment = () => {
    setAppointments(true);
  };

  // DOCTORS
  const names = [
    {
      id_doctor: 2,
      name: "Fabrizzio Bongiorno",
    },
    {
      id_doctor: 3,
      name: "Laura García",
    },
    {
      id_doctor: 4,
      name: "Ernesto Pérez",
    },
  ];

  // TIME APPOINTMENTS
  const times = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  // TABLE SELECTION
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function getStylesTime(time, timeValue, theme) {
    return {
      fontWeight:
        timeValue.indexOf(time) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeTime = (event) => {
    const {
      target: { value },
    } = event;
    setTime(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      id_doctor: data.get("doctor"),
      date: data.get("date"),
      time: data.get("time"),
    };

    createAppointment(body);
  };

  const getDoctors = async () => {
    try {
      const data = await userService.getDoctors(token);
      setDoctors(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createAppointment = async (body) => {
    try {
      const response = await userService.createAppointment(token, body);
      setAppointments(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        p: 4,
        borderRadius: 4,
        border: "1px solid #e8e8e8",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateField", "DateField"]}>
          <DateField
            label='Date'
            id='date'
            name='date'
            value={date}
            onChange={handleChange}
            format='YYYY-MM-DD'
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='doctor'>Doctor</InputLabel>
        <Select
          labelId='doctor'
          id='doctor'
          name='doctor'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem
              key={name.id_doctor}
              value={name.id_doctor}
              style={getStyles(name, personName, theme)}>
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='time'>Time</InputLabel>
        <Select
          labelId='time'
          id='time'
          name='time'
          multiple
          value={timeValue}
          onChange={handleChangeTime}
          input={<OutlinedInput label='Time' />}
          MenuProps={MenuProps}>
          {times.map((time) => (
            <MenuItem
              key={time}
              value={time}
              style={getStylesTime(time, timeValue, theme)}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClickSaveAppointment}
          startIcon={<SaveRoundedIcon />}></Button>
      </Box>
    </Box>
  );
}
