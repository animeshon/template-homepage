import React, {useRef} from 'react';
import Router, { useRouter } from 'next/router';

import HeaderDropdown from './header-dropdown';
import styles from './header.module.scss';

const Header = ({ theme }) => {
    const input = useRef(undefined)
    const handleQuerySubmit = e => {
        e.preventDefault();
        if (input.current.value != '') {
            Router.push({
                pathname: 'https://animeshon.com/e/search',
                query: { q: input.current.value },
            });
        }
    };

    return (
        <div className={styles.padder}>
            <header className={styles.header}>
                <a href="/">
                    <h1 className={styles.brand}>
                        <span>Search Manga and Anime</span>
                    </h1>
                </a>
                <form onSubmit={handleQuerySubmit} className={styles.search_group}>
                    <input
                        ref={input}
                        type="text"
                        className={styles.search_input}
                        name="searchQuery"
                    />
                </form>
                <HeaderDropdown theme={theme} />
            </header>
        </div>
    );
};

export default Header;
