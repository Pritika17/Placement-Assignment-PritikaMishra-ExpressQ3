const express = require('express');
const app = express();
app.use(express.json());

let blogPosts = [];

// Endpoint: GET /blogs
app.get('/blogs', (req, res) => {
  res.json(blogPosts);
});

// Endpoint: POST /blogs
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  // Create a new blog post object
  const newBlogPost = {
    id: blogPosts.length + 1,
    title,
    content
  };

  // Add the new blog post to the array
  blogPosts.push(newBlogPost);

  res.status(201).json(newBlogPost);
});

// Endpoint: PUT /blogs/:id
app.put('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Find the blog post with the given ID
  const blogPost = blogPosts.find(post => post.id === parseInt(id));

  if (!blogPost) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  // Update the blog post
  blogPost.title = title;
  blogPost.content = content;

  res.json(blogPost);
});

// Endpoint: DELETE /blogs/:id
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the blog post with the given ID
  const index = blogPosts.findIndex(post => post.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  // Remove the blog post from the array
  blogPosts.splice(index, 1);

  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
