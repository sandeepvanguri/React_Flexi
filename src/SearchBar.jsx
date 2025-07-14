import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => (
  <form className={styles.searchBar} onSubmit={e => e.preventDefault()} role="search">
    <input
      type="text"
      className={styles.input}
      placeholder="Search posts..."
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Search posts by title or content"
    />
  </form>
);

export default SearchBar;
