import { useAuth } from 'contexts/AuthContextProvider';
import { logoutSection, sections } from './utils';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import Logo from 'assets/images/logo-black.svg';

import styles from './Sidebar.module.scss';

export default function Sidebar({ children }) {
    const { isTeacher, checkAuth, logout } = useAuth();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        }
    }, []);

    return (
        <div className={styles.window}>
            <div className={styles.sidebar}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <img src={Logo} alt="logo" />
                        <h1>Fluent English</h1>
                    </div>
                    <ul className={styles.sections}>
                        {sections.map(
                            ({ title, icon, activeIcon, alt, route }) => (
                                <NavLink to={route} key={route}>
                                    <li>
                                        <img src={icon} alt={alt} />
                                        <img
                                            className={styles.active}
                                            src={activeIcon}
                                            alt={alt}
                                        />
                                        <span>{title}</span>
                                    </li>
                                </NavLink>
                            )
                        )}
                        <li onClick={logout}>
                            <img
                                src={logoutSection.icon}
                                alt={logoutSection.alt}
                            />
                            <img
                                className={styles.active}
                                src={logoutSection.activeIcon}
                                alt={logoutSection.alt}
                            />
                            <span>{logoutSection.title}</span>
                        </li>
                    </ul>
                </div>
                <span className={styles.copyright}>
                    Copyright © Fluent English {new Date().getFullYear()}
                </span>
            </div>
            <div className={styles.page}>{children}</div>
        </div>
    );
}
