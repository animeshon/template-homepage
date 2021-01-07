import React from 'react';
import Router, { useRouter } from 'next/router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { withTranslation } from '@/root/i18n'

import * as style from './header-dropdown.module.scss';


const HeaderDropdown = ({ t, theme }) => {
    const options = [
        { href: 'https://animeshon.com/', value: 'users', label: <div className={style.wrapper}><img src={"../svg/open-book.svg"} className={style.icon} /><span>{t('aboutDispatcher_choose_user')}</span></div> },
        { href: 'https://creators.animeshon.com/', value: 'creators', label: <div className={style.wrapper}><img src={"../svg/painter.svg"} className={style.icon} /><span>{t('aboutDispatcher_choose_creator')}</span></div> },
        { href: 'https://developers.animeshon.com/', value: 'developers', label: <div className={style.wrapper}><img src={"../svg/material-computer.svg"} className={style.icon} /><span>{t('aboutDispatcher_choose_developer')}</span></div> },
    ];

    const onSelect = (option) => {
        Router.push({
            pathname: options.filter(o => o.value == option.value)[0].href,
        });
    };

    const router = useRouter();
    const defaultOption = options.filter(o => o.value == theme)[0];

    return (
        <>
            {defaultOption && <Dropdown
                controlClassName={style.menu}
                arrowClassName={style.arrow}
                onChange={onSelect}
                options={options} value={defaultOption} />}
        </>
    );
};

export default withTranslation()(HeaderDropdown);
