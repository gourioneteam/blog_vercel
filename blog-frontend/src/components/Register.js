import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/users/register', data, { withCredentials: true });
      console.log('Response:', response);
      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Error registering user:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering user', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h1>Register</h1>
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
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
