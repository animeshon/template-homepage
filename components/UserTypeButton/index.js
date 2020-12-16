import React from 'react';
import { Link } from '@/root/i18n'

import styles from './UserTypeButton.module.scss';

const UserTypeButton = ({type, href, children}) => {
    let userTypeClass = '';
    if (type == 'creator') {
        userTypeClass = styles.user_type_creator;
    } else if (type == 'user') {
        userTypeClass = styles.user_type_user;
    } else if (type == 'dev') {
        userTypeClass = styles.user_type_dev;
    }

    return (
        <Link href={href}>
            <div className={`${styles.user_type_button} ${userTypeClass}`}>
                <div className={styles.children_container}>
                {children}
                </div>
                </div>
        </Link>

    );
};

export default UserTypeButton;
