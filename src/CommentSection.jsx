import React, { useState } from "react";
import styles from "./CommentSection.module.css";

function Comment({ name, date, text, avatar }) {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={styles.commentContainer}>
      {avatar && (
        <img src={avatar} alt={`${name}'s avatar`} className={styles.avatar} />
      )}
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.commentName}>{name}</span>
          <span className={styles.commentDate}>{formattedDate}</span>
        </div>
        <div className={styles.commentText}>{text}</div>
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <div className={styles.commentList} aria-live="polite">
      {comments.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic" }}>No comments yet.</div>
      )}
      {comments.map((c) => (
        <Comment key={c.id} {...c} />
      ))}
    </div>
  );
}

function CommentForm({ onSubmit, isLoggedIn, userName }) {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isLoggedIn && !name.trim()) errs.name = "Name is required";
    if (!text.trim()) errs.text = "Comment is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        name: isLoggedIn ? userName : name,
        text,
        date: new Date().toISOString(),
        avatar: undefined,
      });
      setText("");
      setSubmitting(false);
    }, 400);
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit} aria-label="Add a comment">
      {!isLoggedIn && (
        <div className={styles.formGroup}>
          <label htmlFor="comment-name" className={styles.formLabel}>
            Name
          </label>
          <input
            id="comment-name"
            className={styles.formInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "comment-name-error" : undefined}
          />
          {errors.name && (
            <span className={styles.formError} id="comment-name-error">
              {errors.name}
            </span>
          )}
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="comment-text" className={styles.formLabel}>
          Comment
        </label>
        <textarea
          id="comment-text"
          className={styles.formTextarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
          aria-invalid={!!errors.text}
          aria-describedby={errors.text ? "comment-text-error" : undefined}
        />
        {errors.text && (
          <span className={styles.formError} id="comment-text-error">
            {errors.text}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={styles.formButton}
        disabled={submitting}
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default function CommentSection({ comments, onAddComment, isLoggedIn, userName }) {
  return (
    <section className={styles.commentSection}>
      <h2 style={{ marginBottom: 16 }}>Comments</h2>
      <CommentList comments={comments} />
      <CommentForm onSubmit={onAddComment} isLoggedIn={isLoggedIn} userName={userName} />
    </section>
  );
}
