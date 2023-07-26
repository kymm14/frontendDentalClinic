import * as React from "react";

// @MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./RegisterPage.scss";
import authService from "../../_services/authService";
import { NavLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [register, setRegister] = React.useState(false);

  // HANDLES 
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const credentialsRegister = {
      name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    newRegister(credentialsRegister);
  };

  const newRegister = async (credentialsRegister) => {
    try {
      const response = await authService.register(credentialsRegister);
      setError(null);
      setRegister(true);
      console.log(response);
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <>
      {!register && (
        <div className='Register'>
          <div className='backgroundRegister'></div>
          <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <Box
                sx={{
                  paddingTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Register
                </Typography>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete='given-name'
                        name='firstName'
                        required
                        fullWidth
                        id='firstName'
                        label='First Name'
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lastName'
                        autoComplete='family-name'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type={showPassword ? "text" : "password"}
                        id='password'
                        autoComplete='new-password'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'>
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}>
                    Register
                  </Button>
                  <Grid container justifyContent='center'>
                    <Grid item>
                      <Link href='/login' variant='body2' color={"#212121"}>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      )}

      {register && (
        <Box
          sx={{
            mt: 5,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography sx={{ fontSize: 30 }}>
            User Created Successfully!
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to='/login'>
            <Button
              variant='contained'
              size='medium'
              sx={{
                mt: 2,
                color: "white",
                bgcolor: "primary",
                alignItems: "center",
              }}>
              LOGIN
            </Button>
          </NavLink>
        </Box>
      )}
    </>
  );
}
