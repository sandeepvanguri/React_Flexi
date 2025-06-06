import React from 'react';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import BlogPostList from './BlogPostList.jsx';
import BlogPostDetail from './BlogPostDetail.jsx';
import BlogPostForm from './BlogPostForm.jsx';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: '<p>Welcome to React! This post will help you get started with building your first React application. <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>',
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: '<p>CSS Grid and Flexbox are both powerful layout systems. This post compares their strengths and use cases.</p>',
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: '<p>Accessibility is crucial for web development. Here are some tips to make your apps more accessible.</p>',
    author: 'Alex Lee',
    date: '2023-03-10',
    url: '/posts/3',
  }
];

function BlogPostDetailWrapper({ posts }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  if (!post) return <BlogPostDetail />;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/">← Back to List</Link> | <Link to={`/posts/${id}/edit`}>Edit Post</Link>
      </div>
      <BlogPostDetail
        title={post.title}
        content={post.content}
        author={post.author}
        date={post.date}
      />
    </div>
  );
}

function BlogPostCreateWrapper({ onCreate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/">← Back to List</Link>
      </div>
      <BlogPostForm
        onSubmit={data => {
          setLoading(true);
          setTimeout(() => {
            onCreate(data);
            setLoading(false);
            navigate('/');
          }, 500);
        }}
        loading={loading}
      />
    </div>
  );
}

function BlogPostEditWrapper({ posts, onEdit }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  if (!post) return <p>Blog post not found.</p>;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to={`/posts/${id}`}>← Back to Post</Link>
      </div>
      <BlogPostForm
        post={post}
        onSubmit={data => {
          setLoading(true);
          setTimeout(() => {
            onEdit(id, data);
            setLoading(false);
            navigate(`/posts/${id}`);
          }, 500);
        }}
        loading={loading}
      />
    </div>
  );
}

const App = () => {
  const [posts, setPosts] = React.useState(samplePosts);

  const handleCreate = (data) => {
    const newPost = {
      ...data,
      id: (posts.length + 1).toString(),
      url: `/posts/${posts.length + 1}`,
    };
    setPosts([...posts, newPost]);
  };

  const handleEdit = (id, data) => {
    setPosts(posts => posts.map(p => p.id === id ? { ...p, ...data } : p));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <div style={{ marginBottom: 24 }}>
        <Link to="/posts/new" style={{ background: '#007BFF', color: '#fff', padding: '8px 16px', borderRadius: 4, textDecoration: 'none' }}>+ New Post</Link>
      </div>
      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} />} />
        <Route path="/posts/new" element={<BlogPostCreateWrapper onCreate={handleCreate} />} />
        <Route path="/posts/:id/edit" element={<BlogPostEditWrapper posts={posts} onEdit={handleEdit} />} />
        <Route path="/posts/:id" element={<BlogPostDetailWrapper posts={posts} />} />
      </Routes>
    </div>
  );
};

export default App;