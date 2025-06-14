import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick }) => (
  <button className={styles.deleteBtn} onClick={onClick} type="button">
    Delete
  </button>
);

export default DeleteButton;
