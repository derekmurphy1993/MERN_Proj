import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import PrivRoute from './components/PrivRoute';
import CreateListing from './pages/CreateListing';


export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route element={<PrivRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/create-listing" element={<CreateListing />} />
    </Route>
  </Routes>
  </BrowserRouter>
}
