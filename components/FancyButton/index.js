import React from 'react';
import styles from './FancyButton.module.css';

const FancyButton = ({ children }) => {
    return (
        <div className={classNames(styles.fancy_button, styles.fancy_more, styles.fancy_more_bottom)}>
            {children}
        </div>
    );
};

export default FancyButton;
