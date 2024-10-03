import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import axios from 'axios';

const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/checkAuth', { withCredentials: true });
       console.log(response.data.isAuthenticated)
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/logout', { withCredentials: true });
      console.log(response.data); // Check response data to verify server response
      setIsAuthenticated(false); // Update state
      localStorage.removeItem('token'); // Optionally remove token if used
      navigate('/users/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">My Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {isAuthenticated && <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>}
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/users/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/users/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
/*
Local Storage is a web storage API provided by the browser that allows you to store data in key-value pairs on the client side. Data stored in local storage persists even after the browser is closed and reopened.
It's part of the Web Storage API, which also includes session storage, but local storage has no expiration time.
When users log in, an authentication token (often a JWT - JSON Web Token) might be saved in local storage to keep track of their session. This token is usually sent with subsequent requests to verify the user's identity.
Remove Token: When the user logs out, it's important to remove this token from local storage to ensure that the user's session is effectively terminated and they cannot access protected resources.
localStorage.removeItem('token'): This line of code removes the item with the key 'token' from local storage. If a token was previously stored under this key, this line effectively deletes it.
*/