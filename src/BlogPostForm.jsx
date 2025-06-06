import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit, loading }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date ? post.date.slice(0, 10) : '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
    setAuthor(post?.author || '');
    setDate(post?.date ? post.date.slice(0, 10) : '');
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ title, content, author, date });
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          id="title"
          className={styles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
        />
        {errors.title && <p className={styles.error} id="title-error">{errors.title}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <textarea
          id="content"
          className={styles.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
          aria-invalid={!!errors.content}
          aria-describedby="content-error"
        />
        {errors.content && <p className={styles.error} id="content-error">{errors.content}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author" className={styles.label}>Author</label>
        <input
          id="author"
          className={styles.input}
          value={author}
          onChange={e => setAuthor(e.target.value)}
          aria-invalid={!!errors.author}
          aria-describedby="author-error"
        />
        {errors.author && <p className={styles.error} id="author-error">{errors.author}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Publication Date</label>
        <input
          id="date"
          type="date"
          className={styles.date}
          value={date}
          onChange={e => setDate(e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby="date-error"
        />
        {errors.date && <p className={styles.error} id="date-error">{errors.date}</p>}
      </div>
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading}
      >
        {loading ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogPostForm;
