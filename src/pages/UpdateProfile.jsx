import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";

// @MUI
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  password: "",
};

export default function UpdateProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
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
      navigate("/profile");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        pl: 5,
        pr: 5,

        alignItems: "flex-start",
      }}>
      <Box
        sx={{
          mt: 1,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar
          src={`public/images/avatars/avatar_${user.id}.jpg`}
          sx={{
            width: "15%",
            height: "15%",
          }}
        />
        <Typography sx={{ mt: 1 }} component='h1' variant='h5'>
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
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction='column' spacing={2}>
              <TextField
                required
                fullWidth
                id='birthday'
                label='Birthday yyyy-mm-dd'
                name='birthday'
                autoComplete='date'
                value={formValues.birthday}
                onChange={handleChange}
                InputProps={{
                  readOnly: !editProfile,
                }}
              />
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
  );
}
