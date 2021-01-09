import React, {useRef} from 'react';
import { withTranslation } from '@/root/i18n';

import EncyclopediaTextSearch from '@/components/encyclopedia-text-search';
import HeaderDropdown from './header-dropdown';
import styles from './header.module.scss';

const Header = ({ theme, t }) => {
    const input = useRef(undefined)
    return (
        <div className={styles.padder}>
            <header className={styles.header}>
                <a href="/">
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
                <HeaderDropdown theme={theme} />
            </header>
        </div>
    );
};

export default withTranslation("common")(Header);
