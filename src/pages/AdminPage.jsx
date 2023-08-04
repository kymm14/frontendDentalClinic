import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

// @MUI
import {
  Box,
  Container,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import userService from "../_services/userService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminPage() {
  // HOOKS
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getUsers();
  }, [usersPage]);

  // HANDLERS
  const handleChange = (event, value) => {
    setUsersPage(value);
  };

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAll(token, usersPage);
      setUsers(data.results);
      setCount(data.info.pages);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant='h1'
          fontSize={40}
          align='center'
          fontWeight={400}
          gutterBottom>
          Admin panel
        </Typography>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={count}
            page={usersPage}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>ID</TableCell>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Last Name</TableCell>
                <TableCell align='left'>Birthday</TableCell>
                <TableCell align='left'>Email</TableCell>
                <TableCell align='left'>Role</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {u.id}
                  </TableCell>
                  <TableCell align='left'>{u.name}</TableCell>
                  <TableCell align='left'>{u.last_name}</TableCell>
                  <TableCell align='left'>
                    {format(new Date(u.birthday), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell align='left'>{u.email}</TableCell>
                  <TableCell align='left'>{u.id_role}</TableCell>
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
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={count}
            page={usersPage}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>
    </>
  );
}
