import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

// pages
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/404' element={<Page404 />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </div>
  );
}
