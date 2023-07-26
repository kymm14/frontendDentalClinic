import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";

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
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const defaultTheme = createTheme();

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  password: "",
};

export default function ProfilePage() {
  // HOOKS
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
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isLoggedIn) {
      if (isDoctor) {
        navigate("/doctor");
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAppointments();
  }, []);

  // HANDLERS
  const handleClickEditProfile = () => {
    setEditProfile(true);
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
    console.log({
      name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      birthday: data.get("birthday"),
      password: data.get("password"),
    });

    modifyProfile(data);
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
        role: data.id_role,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const modifyProfile = async (token) => {
    try {
      const response = await userService.modifyProfile(token);
      setEditProfile(false);
      getProfile(token);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await userService.getAppointmentsDoctor(token);
      setDates(response);
    } catch (error) {
      console.log(error);
    }
  };

  const ViewAppointments = ({ appointments }) => {
    function createData(date, time, patientName, patientLastName) {
      return { date, time, patientName, patientLastName };
    }

    const dates = appointments.map((a) =>
      createData(a.date, a.time, a.patient.name, a.patient.lastName)
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
                <TableCell align='center'>Patient</TableCell>
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
                    {row.patientName} {row.patientLastName}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton>
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
        </TableContainer>
      </>
    );
  };

  // ----------------------------------------------------------------------------------------

  return (
    <>
      {!editProfile && (
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
                    <Typography
                      component='h2'
                      variant='h4'
                      sx={{ fontSize: 45 }}>
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
                      <ListItem>
                        <ListItemIcon>
                          <MedicalServicesIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary={"Doctor"} />
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
      )}

      {editProfile && (
        <Box
          sx={{
            marginTop: 4,
            alignItems: "flex-start",
          }}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Avatar
              src={`public/images/avatars/avatar_${user.id}.jpg`}
              sx={{
                width: "15%",
                height: "15%",
                ml: 4,
                display: "flex",
                justifyContent: "center",
              }}
            />
            <Typography
              sx={{ mt: 1, mb: 2, ml: 4 }}
              component='h1'
              variant='h5'>
              Profile
            </Typography>
          </Box>

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
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    value={formValues.firstName}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !editProfile,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                    value={formValues.lastName}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !editProfile,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={formValues.email}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !editProfile,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id='birthday'
                    label='Birthday'
                    name='birthday'
                    autoComplete='date'
                    value={formValues.birthday}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !editProfile,
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction='column' spacing={2}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type={showPassword ? "text" : "password"}
                    id='password'
                    autoComplete='new-password'
                    InputProps={{
                      readOnly: !editProfile,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    name='verify-password'
                    label='Password'
                    type={showPassword ? "text" : "password"}
                    id='verify-password'
                    autoComplete='new-password'
                    InputProps={{
                      readOnly: !editProfile,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
          </Box>
        </Box>
      )}
    </>
  );
}
