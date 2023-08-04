import React, { useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";

// @MUI
import {
  Box,
  Stack,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

export default function SearchAppointment() {
  // HOOKS
  const token = useSelector((state) => state.auth.token);
  const [appointment, setAppointment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // HANDLERS
  const handleSubmit = async (event) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const idAppointment = +data.get("appointment");
      getOneAppointment(idAppointment);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOneAppointment = async (idAppointment) => {
    setIsLoading(true);
    try {
      const id = { id: idAppointment };
      const data = await userService.getAppointmentById(token, id);
      setAppointment(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          m: 1,
          borderRadius: 4,
          minWidth: 500,
        }}>
        <Stack
          fullWidth
          direction='row'
          alignItems='center'
          justifyContent='space-between'>
          <TextField
            fullWidth
            name='appointment'
            id='outlined-basic'
            label='Search appointment'
            variant='outlined'
          />
        </Stack>
      </Box>

      {!isLoading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ID</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Time</TableCell>
                <TableCell align='center'>Doctor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {appointment.id}
                </TableCell>
                <TableCell align='center'>{appointment.date}</TableCell>
                <TableCell align='center'>{appointment.time} </TableCell>
                <TableCell align='center'>
                  {appointment.doctor.user.name}{" "}
                  {appointment.doctor.user.last_name}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
