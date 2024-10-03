import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs', { withCredentials: true });
        setBlogs(response.data.blogs);
        setUser(response.data.user);
      } catch (error) {
        setError('Error fetching blogs');
        console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`, { withCredentials: true });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h1>Blogs</h1>
      {user && <Button as={Link} to="/blogs/new">Add New Blog</Button>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            {user && blog.author._id === user.id && (
              <>
                <Button as={Link} to={`/blogs/${blog._id}/edit`}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default BlogList;
