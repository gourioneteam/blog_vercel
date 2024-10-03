import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', data, { withCredentials: true });
      console.log('Response:', response);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/blogs');
      } else {
        console.error('Login failed, no token received');
      }
    } catch (error) {
      console.error('Error logging in', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register('username', { required: true })}
          />
          {errors.username && <span>This field is required</span>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
