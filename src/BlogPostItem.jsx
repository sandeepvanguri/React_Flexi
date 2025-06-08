import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ post }) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div className={styles.blogPostItem}>
            <Link to={post.url} className={styles.title}>
                <h2>{post.title}</h2>
            </Link>
            <p className={styles.summary}>{post.summary}</p>
            <p className={styles.date}>Published on {formattedDate}</p>
        </div>
    );
};

export default BlogPostItem;