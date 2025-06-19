import React from 'react';
import styles from './Layout.module.css';
import NavBar from './NavBar.jsx';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <NavBar />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
