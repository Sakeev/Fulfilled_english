import styles from './Button.module.scss';

const Button = ({ children, ...otherProps }) => {
    return (
        <button {...otherProps} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
