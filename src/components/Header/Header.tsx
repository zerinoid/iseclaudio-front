"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/ise_logo.svg" alt="Logo" width={26} height={40} />
        </Link>
      </div>
      <nav
        className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}
      >
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="menu"
          onClick={toggleMobileMenu}
        >
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ""}`}
          ></div>
        </button>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">HOME</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about">BIO</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/services">EXHIBTIONS</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact">PROJECTS</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact">SUBSCRIBE</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
