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

const defaultTheme = createTheme();

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  password: "",
};

export default function ProfilePage() {
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({});
  const [dates, setDates] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const isDoctor = userRole == "doctor";
  const isAdmin = userRole == "admin";

  useEffect(() => {
    if (isLoggedIn) {
      if (isDoctor) {
        navigate("/doctor");
      } else {
        navigate("/profile");
      }
    }
  }, [isLoggedIn]);

  // global state hooks
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAppointments();
  }, []);

  // handlers
  const handleClickEditProfile = () => {
    navigate("/update");
  };

  const handleCreateAppointment = () => {
    navigate("/create");
  };

  const handleUpdateAppointment = () => {
    navigate("/appointment");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      birthday: data.get("birthday"),
      password: data.get("password"),
    };
    modifyProfile(body);
  };

  const modifyProfile = async (body) => {
    try {
      const response = await userService.modifyProfile(token, body);
      setUser(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data);
      setFormValues({
        firstName: data.name,
        lastName: data.last_name,
        email: data.email,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await userService.getAppointments(token);
      setDates(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const ViewAppointments = ({ appointments }) => {
    function createData(id, date, time, doctorName, doctorLastName) {
      return { id, date, time, doctorName, doctorLastName };
    }

    const dates = appointments.map((a) =>
      createData(a.id, a.date, a.time, a.doctor.name, a.doctor.lastName)
    );

    return (
      <>
        <Box sx={{ mt: 6 }}>
          <Typography component='h3' variant='h5' gutterBottom>
            Appointments
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Time</TableCell>
                <TableCell align='center'>Doctor</TableCell>
                <TableCell align='center'>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dates.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}>
                  <TableCell align='center' component='th' scope='row'>
                    {row.date}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {row.time}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {row.doctorName} {row.doctorLastName}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton onClick={handleUpdateAppointment}>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon sx={{ color: "error.main" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleCreateAppointment}
            size='small'
            variant='contained'
            endIcon={<AutoFixHighIcon />}>
            Create Appointment
          </Button>
        </TableContainer>
      </>
    );
  };

  // ----------------------------------------------------------------------------------------

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='md' sx={{ pb: 5 }}>
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              marginLeft: 1,
              marginRight: 1,
              alignItems: "flex-start",
            }}>
            <Grid container spacing={0}>
              <Grid item sm={3}>
                <Box>
                  <Avatar
                    src={`public/images/avatars/avatar_${user.id}.jpg`}
                    sx={{
                      width: "80%",
                      height: "80%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item sm={9}>
                <Box>
                  <Typography component='h2' variant='h4' sx={{ fontSize: 45 }}>
                    {user.name} {user.last_name}
                  </Typography>

                  <List dense={true} sx={{ marginLeft: -2 }}>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 15 }}
                        primary={user?.email}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CalendarMonthIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 15 }}
                        primary={user.birthday}
                      />
                    </ListItem>
                  </List>
                  <Button
                    onClick={handleClickEditProfile}
                    size='small'
                    variant='contained'
                    endIcon={<AutoFixHighIcon />}>
                    Edit Profile
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <ViewAppointments appointments={dates} />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
