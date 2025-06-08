import BlogPostItem from './BlogPostItem.jsx';
import styles from './BlogPostList.module.css';

function BlogPostList({ posts }) {
    return (
        <div className={styles.blogPostList}>
            {posts.map(post => (
                <BlogPostItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default BlogPostList;