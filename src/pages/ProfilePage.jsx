import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateIcon from "@mui/icons-material/Create";

import SearchAppointment from "./SearchAppointment";

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
  const [user, setUser] = useState({});
  const [dates, setDates] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const isDoctor = userRole == "doctor";
  const isAdmin = userRole == "admin";
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [deleteDate, setDeleteDate] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      if (isDoctor) {
        navigate("/doctor");
      } else {
        navigate("/profile");
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
    navigate("/update");
  };

  const handleCreateAppointment = () => {
    navigate("/create");
  };

  const handleUpdateAppointment = (id) => {
    navigate(`/appointment/${id}`);
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

  const handleDeleteAppointment = async () => {
    try {
      const id = { id: deleteDate };
      await userService.deleteAppointment(token, id);
      const response = await userService.getAppointments(token);
      setDates(response);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteDate(id);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography
            component='h2'
            variant='h4'
            gutterBottom
            sx={{ fontSize: 25 }}>
            Appointments
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            margin: "1em",
            textAlign: "center",
          }}>
          <TableContainer component={Paper}>
            <TableRow
              sx={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                margin: "1em",
              }}>
              <SearchAppointment />
            </TableRow>
            <Table sx={{ minWidth: 500 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Time</TableCell>
                  <TableCell align='center'>Doctor</TableCell>
                  <TableCell align='center'>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dates.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell align='center' component='th' scope='row'>
                      {row.id}
                    </TableCell>
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
                      <IconButton
                        onClick={() => handleUpdateAppointment(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleClickOpen(row.id)}>
                        <DeleteIcon sx={{ color: "error.main" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              sx={{ margin: "1em" }}
              onClick={handleCreateAppointment}
              size='small'
              variant='contained'
              endIcon={<CreateIcon />}>
              Create New Appointment
            </Button>
          </TableContainer>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {"Delete Appointment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete the appointment? This action is
              irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={(handleClose, handleDeleteAppointment)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
              marginTop: 6,
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
                      width: "90%",
                      height: "90%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item sm={9}>
                <Box sx={{ mt: 1 }}>
                  <Typography component='h2' variant='h4' sx={{ fontSize: 40 }}>
                    {user.name} {user.last_name}
                  </Typography>

                  <List dense={true} sx={{ marginLeft: -2 }}>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 18 }}
                        primary={user?.email}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CalendarMonthIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 18 }}
                        primary={user?.birthday}
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
            {!isAdmin && <ViewAppointments appointments={dates} />}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
