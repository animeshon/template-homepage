import React, { useRef, useState } from 'react';
import { withTranslation } from '@/root/i18n';

import cn from 'classnames'

import EncyclopediaTextSearch from '@/components/encyclopedia-text-search';
import Sidebar from './sidebar';
import HeaderDropdown from './header-dropdown';
import styles from './header.module.scss';

const routes = [
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'Discord' },
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'Patreon' },
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'Reddit' },
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'Twitter' },
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'Github' },
    { href: 'https://animeshon.com/blog', label: 'Blog' },
];

const Header = ({ theme, t }) => {
    const [sidebarOpen, setSidebar] = useState(false);

    const handleSidebarOpening = e => {
        const target = e.currentTarget.id === 'sidebar-opener';
        if (target) {
            setSidebar(true);
        } else {
            setSidebar(false);
        }
    };

    const input = useRef(undefined)
    return (
        <div className={styles.padder}>
            <header className={styles.header}>
                <div className="container-fluid">
                    <div className="row middle-sm">
                        <div className="col-sm-offset-1 col-md-offset-1 col-sm-10 col-md-10 col-lg-12">
                            <div className="row middle-sm">
                                <a href="/" className={styles['brand-a']}>
                                    <h1 className={styles.brand}>
                                        <span>{t("brandAltText")}</span>
                                    </h1>
                                </a>
                                <EncyclopediaTextSearch className={styles.search_group} textRef={input}>
                                    <input
                                        ref={input}
                                        type="text"
                                        className={styles.search_input}
                                        placeholder={t("searchHeaderPlaceholder")}
                                    />
                                </EncyclopediaTextSearch>
                                {/* <HeaderDropdown theme={theme} /> */}

                                <div className={styles['right-menu']}>
                                    <nav className={styles['icon-menu']}>
                                        <ul className="hidden-sm hidden-md hidden-xlg-strict">
                                            {routes.map(({ href, label }, k) => (
                                                <li key={k}>
                                                    <a href={href}>
                                                        {label}
                                                        {/*<img loading="lazy" src={image} alt={title} />*/}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* <MobileMenu menu={menu} icons={icons} /> */}
                                    </nav>
                                </div>


                                <button
                                    onClick={handleSidebarOpening}
                                    id="sidebar-opener"
                                    className={cn("hidden-xlg", styles.hamburger_icon)}
                                >
                                    <span />
                                    <span />
                                    <span />
                                </button>
                                <Sidebar open={sidebarOpen} closeSidebar={handleSidebarOpening} routes={routes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default withTranslation("common")(Header);
