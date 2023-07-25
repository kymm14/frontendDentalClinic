import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";

// @MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  password: "",
};

export default function CreateAppointment() {
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({});
  const [dates, setDates] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const [doctors, setDoctors] = useState({});

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

  const times = ["08:00", "10:00", "13:00", "15:00", "17:00", "19:00"];

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

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [timeValue, setTime] = React.useState([]);

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
    setTime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const token = useSelector((state) => state.auth.token);

  const handleClickEditProfile = () => {
    setEditProfile(true);
  };

  useEffect(() => {
    getProfile();
    getDoctors();
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data);
      setFormValues({
        firstName: data.name,
        lastName: data.last_name,
        email: data.email,
        birthday: data.birthday,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      id_doctor: data.id_doctor,
      date: data.date,
      time: data.time,
    };
    createAppointment(body);
  };

  const createAppointment = async (body) => {
    try {
      const response = await userService.createAppointment(token, body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack direction='column' spacing={2}>
            <TextField
              required
              fullWidth
              id='date'
              label='Date'
              name='date'
              autoComplete='date'
              value={formValues.date}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id='time'
              label='Time'
              name='time'
              autoComplete='time'
              value={formValues.time}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClickEditProfile}
          startIcon={
            editProfile ? <SaveRoundedIcon /> : <EditRoundedIcon />
          }></Button>
      </Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-name-label'>Doctor Name</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
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
        <InputLabel id='demo-multiple-name-label'>Time</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
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
    </Box>
  );
}
