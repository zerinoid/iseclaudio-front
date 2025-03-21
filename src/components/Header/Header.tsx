'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import logo from '#/ise_logo.svg'
import instagram from '#/instagram.svg'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const closeMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className={`${styles.nav}`}>
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="menu"
          onClick={toggleMobileMenu}
        >
          <div
            className={`${styles.bar} ${
              isMobileMenuOpen ? styles.barOpen : ''
            }`}
          ></div>
          <div
            className={`${styles.bar} ${
              isMobileMenuOpen ? styles.barOpen : ''
            }`}
          ></div>
          <div
            className={`${styles.bar} ${
              isMobileMenuOpen ? styles.barOpen : ''
            }`}
          ></div>
        </button>
        <ul
          className={`${styles.navList} ${
            isMobileMenuOpen ? styles.mobileOpen : ''
          }`}
        >
          <li className={styles.navItem}>
            <Link onClick={closeMenu} href="/">
              HOME
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link onClick={closeMenu} href="/bio">
              BIO
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link onClick={closeMenu} href="/exhibitions">
              EXHIBITIONS
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link onClick={closeMenu} href="/projects">
              PROJECTS
            </Link>
          </li>
          {/* <li className={styles.navItem}>
              <Link onClick={closeMenu} href="/subscribe">
              SUBSCRIBE
              </Link>
              </li> */}
          <li className={styles.navItem}>
            <Link onClick={closeMenu} href="/contact">
              CONTACT
            </Link>
          </li>
          {/* <li className={styles.navItem}>
              <Link onClick={closeMenu} href="shop">
              SHOP
              </Link>
              </li> */}
          <li>
            <a
              onClick={closeMenu}
              href="https://www.instagram.com/ise.claudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="Instagram" src={instagram} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
