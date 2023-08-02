import React, { useEffect, useState } from "react";

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
import { AlertTitle, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../_services/authService";
import { updateAuthStateLogin } from "../../features/authentication/updateAuthState";
import "./LoginPage.scss";

const defaultTheme = createTheme();

export default function LoginPage() {
  // HOOKS
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const isAdmin = userRole == "admin";
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // VALIDATION FRONTEND
    login(credentials);
  };

  const login = async (credentials) => {
    setisLoading(true);
    try {
      const response = await authService.login(credentials);
      setError(null);
      updateAuthStateLogin(response.token);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className='Login'>
        <div className='backgroundLogin'></div>
        <ThemeProvider theme={defaultTheme}>
          {error && (
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

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
                Login
              </Typography>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={showPassword ? "text" : "password"}
                  id='password'
                  autoComplete='current-password'
                  InputProps={{
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

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
                <Grid container justifyContent='center'>
                  <Grid item>
                    <Link href='/register' variant='body2' color={"#212121"}>
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
