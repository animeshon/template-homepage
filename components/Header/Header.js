import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
        <>
            <header className={styles.search_header}>
                <Link href="/">
                    <h1 className={styles.brand}>
                        <span>Search Manga and Anime</span>
                    </h1>
                </Link>
            </header>
            <div className="header_padder" />
        </>
    );
};

export default Header;
