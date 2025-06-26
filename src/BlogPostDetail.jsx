import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import CommentSection from './CommentSection.jsx';

const initialComments = [];

const BlogPostDetail = ({ title, content, author, date }) => {
    const { id } = useParams();
    const [comments, setComments] = useState(initialComments);

    const handleAddComment = (comment) => {
        setComments((prev) => [
            ...prev,
            { ...comment, id: Date.now() }
        ]);
    };

    if (!title || !content || !author || !date) {
        return <p>Blog post not found.</p>;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className={styles.blogPostDetail}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.author}>By {author}</p>
            <p className={styles.date}>Published on {formattedDate}</p>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
            <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
                isLoggedIn={false}
                userName=""
            />
        </div>
    );
};

export default BlogPostDetail;