import closeIcon from 'assets/icons/close.svg';
import { useEffect } from 'react';

import styles from './Modal.module.scss';

const Modal = ({ children, useStateHook }) => {
    const [show, setShow] = useStateHook;

    useEffect(() => {
        if (!show) document.removeEventListener('keydown', escape);
        else document.addEventListener('keydown', escape);
    }, [show]);

    const escape = (event) => {
        if (event.key === 'Escape') {
            setShow(false);
        }
    };

    const close = () => {
        setShow(false);
    };

    return (
        <div
            onClick={close}
            className={`${styles.modalContainer} ${show ? styles.show : ''}`}
        >
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <img onClick={close} src={closeIcon} alt="close" />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
