import React from 'react';
import HeaderDropdown from './header-dropdown';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <>
            <header className={styles.search_header}>
                <a href="/">
                    <h1 className={styles.brand}>
                        <span>Search Manga and Anime</span>
                    </h1>
                </a>
                <div className={styles.space}/>
                <HeaderDropdown />
            </header>
            <div className="header_padder" />
        </>
    );
};

export default Header;
