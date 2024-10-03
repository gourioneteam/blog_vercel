// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BlogList from './components/Bloglist';
import BlogForm from './components/BlogForm';
import NavigationBar from './components/Navbar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/new" element={<BlogForm />} />
        <Route path="/blogs/:id/edit" element={<BlogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
