import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";

// @MUI
import { Box, Button, Typography } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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

// ----------------------------------------------------------------
export default function CreateAppointment() {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, editAppointments] = useState(false);
  const [update, setUpdate] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [timeValue, setTime] = React.useState([]);
  const [date, setDate] = React.useState([]);
  const [doctors, setDoctor] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    getDoctors();
  }, []);

  // HANDLERS
  const handleClickSaveAppointment = () => {
    editAppointments(true);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

    updateAppointment(body, id);
  };

  const updateAppointment = async (body, id) => {
    setIsLoading(true);
    try {
      const response = await userService.modifyAppointment(token, body, id);
      setUpdate(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getDoctors(token);
      setDoctor(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!update && (
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            ml: 5,
            mr: 5,
            borderRadius: 4,
            border: "1px solid #e8e8e8",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography sx={{ m: 1 }} component='h1' variant='h5'>
            Update Appointment
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DateField
                sx={{ width: 250 }}
                label='Date'
                id='date'
                name='date'
                value={date}
                onChange={handleChange}
                format='YYYY-MM-DD'
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl sx={{ m: 1, width: 250 }}>
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
              {doctors.map((doc) => (
                <MenuItem
                  key={doc.id}
                  value={doc.id}
                  style={getStyles(doctors, personName, theme)}>
                  {doc.user.name} {doc.user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 250 }}>
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
          <Typography
            sx={{ mt: 1, fontSize: 15, fontStyle: "italic" }}
            component='h3'
            variant='h2'>
            All fields are required.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "20%",
              Button: {
                xs: { width: "100%" },
              },
            }}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}
              onClick={handleClickSaveAppointment}
              startIcon={<SaveRoundedIcon />}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      {update && (
        <Box
          sx={{
            mt: 5,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography sx={{ fontSize: 30, textAlign: "center" }}>
            Appointment Updated Successfully!
          </Typography>
          <Typography sx={{ fontSize: 15, textAlign: "center" }}>
            Go back to your profile to see the updates.
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to='/profile'>
            <Button
              variant='contained'
              size='medium'
              sx={{
                mt: 2,
                color: "white",
                bgcolor: "primary",
                alignItems: "center",
              }}>
              PROFILE
            </Button>
          </NavLink>
        </Box>
      )}
    </>
  );
}
