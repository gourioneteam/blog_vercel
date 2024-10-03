import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Form, Button } from 'react-bootstrap';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/blogs/${id}`, { withCredentials: true });
          setValue('title', response.data.title);
          setValue('content', response.data.content);
          setLoading(false);
        } catch (error) {
          setError('Error fetching blog');
          console.error('Error fetching blog:', error);
        }
      };
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setError('');
    try {
      if (id) {
        const response = await axios.put(`http://localhost:5000/blogs/${id}`, data, { withCredentials: true });
        console.log('Update response:', response.data);
      } else {
        const response = await axios.post('http://localhost:5000/blogs', data, { withCredentials: true });
        console.log('Create response:', response.data);
      }
      navigate('/blogs');
    } catch (error) {
      console.error('Error saving blog:', error.response ? error.response.data : error.message);
      setError('Error saving blog');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h1>{id ? 'Edit Blog' : 'New Blog'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register('title', { required: true })}
          />
          {errors.title && <span>This field is required</span>}
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            {...register('content', { required: true })}
          />
          {errors.content && <span>This field is required</span>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default BlogForm;
