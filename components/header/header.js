import React, { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import cn from 'classnames'

import EncyclopediaTextSearch from '@/components/encyclopedia-text-search';
import Sidebar from './sidebar';
import HeaderDropdown from './header-dropdown';
import styles from './header.module.scss';

import ReactFlagsSelect from 'react-flags-select';

const routes = [
    { href: 'https://discord.gg/WvNsjtR', label: 'Discord' },
    { href: 'https://www.patreon.com/animeshon', label: 'Patreon' },
    { href: 'https://www.reddit.com/r/animeshon/', label: 'Reddit' },
    { href: 'https://twitter.com/animeshonsns', label: 'Twitter' },
    { href: 'https://github.com/animeshon', label: 'Github' },
    { href: 'https://animeshon.com/blog', label: 'Blog' },
];

const Header = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [sidebarOpen, setSidebar] = useState(false);
    const [lang, setLang] = useState(router.query.hl ? router.query.hl.split("-")[1] : "US");
    router.locale = router.query.hl ? router.query.hl.split("-")[0] : "en";

    const handleSidebarOpening = e => {
        const target = e.currentTarget.id === 'sidebar-opener';
        if (target) {
            setSidebar(true);
        } else {
            setSidebar(false);
        }
    };

    const handleLanguageSelect = e => {
        setLang(e);
        switch (e) {
            case "US": {
                router.locale = "en";
                router.query.hl = "en-US";
            }
            case "JP": {
                router.locale = "jp";
                router.query.hl = "jp-JP";
            }
        }
        
        router.push(router);
    }

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
                                {/* TODO! this is just a placeholder
                                    need to add the logic and the translations*/}

                                <div className={styles["lang-select-wrapper"]}>
                                    <ReactFlagsSelect
                                        className={styles["lang-select"]}
                                        countries={["US", "JP"]}
                                        selected={lang}
                                        onSelect={handleLanguageSelect}
                                        customLabels={{ "US": t('LangSelector_english'), "JP": t('LangSelector_japanese') }}
                                        defaultCountry="US"
                                        showSelectedLabel={false}
                                    // disabled={true}
                                    />
                                </div>

                                <Sidebar open={sidebarOpen} closeSidebar={handleSidebarOpening} routes={routes} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
