import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><Link to="/" onClick={handleClose}>My Blog</Link></div>
      <button
        className={styles.hamburger}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={handleToggle}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/" onClick={handleClose}>Home</Link></li>
        <li><Link to="/posts/new" onClick={handleClose}>New Post</Link></li>
      </ul>
      {menuOpen && <div className={styles.overlay} onClick={handleClose} />}
    </nav>
  );
};

export default NavBar;
