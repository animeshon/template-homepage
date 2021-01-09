import React, { useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import styles from './sidebar.module.scss';

const RenderRoutes = ({ arr, closeSidebar, page }) => {
    return arr.map(item => {
        return (
            <li key={item.href} onClick={closeSidebar}>
                <Link href={item.href}>
                    <a className={page == item.href ? 'selected' : ''}>
                        {item.label}
                    </a>
                </Link>
            </li>
        );
    });
};

const Sidebar = ({ open, closeSidebar, routes, router }) => {
    const { query: { page } } = router;
    const ref = useRef(null);

    const escapeListener = useCallback(e => {
        if (e.key === 'Escape') {
            closeSidebar(e)
        }
    }, [])
    const clickListener = useCallback(
        e => {

            if (!(ref?.current)?.contains(e.target)) {
                closeSidebar(e);
                e.preventDefault();
            }
        },
        [ref.current],
    )
    useEffect(() => {
        if (open == true) {
            // Attach the listeners on component mount.
            document.addEventListener('click', clickListener)
            document.addEventListener('keyup', escapeListener)
        } else {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }

        // Detach the listeners on component unmount.
        return () => {

        }
    }, [open])

    return (
        <div >
            <div className={`${styles.overlay} ${!open ? styles.close : ''}`} />
            <aside ref={ref} className={`${styles.sidebar} ${open ? styles.opened : ''}`}>
                <ul>
                    <RenderRoutes
                        arr={routes}
                        closeSidebar={closeSidebar}
                        page={page}
                    />
                </ul>
            </aside>
        </div>
    );
};

export default withRouter(Sidebar);
