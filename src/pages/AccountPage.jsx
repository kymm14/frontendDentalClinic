import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import FolderIcon from "@mui/icons-material/Folder";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//
import userService from "../_services/userService";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

export default function AccountPage() {
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(true);

  // glogal state hooks
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
  }, []);

  // handlers
  const handleClickEditProfile = () => setEditProfile((edit) => !edit);
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
      email: data.get("email"),
      password: data.get("password"),
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
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            alignItems: "flex-start",
          }}>
          <Box sx={{ mt: 1, mb: 4 }}>
            <AccountCircleRoundedIcon
              sx={{ fontSize: 90, color: "secondary.light" }}
            />

            <Typography component='h1' variant='h5'>
              Acount
            </Typography>
          </Box>

          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 5,
              p: 3,
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
                type={editProfile ? "button" : "submit"}
                variant='contained'
                startIcon={
                  editProfile ? <SaveRoundedIcon /> : <EditRoundedIcon />
                }
                onClick={handleClickEditProfile}
                sx={{ mt: 3 }}>
                {editProfile ? "Save changes" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
