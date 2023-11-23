import styles from './Input.module.scss'

const Input = ({ className, ...otherProps }) => {
    return <input {...otherProps} className={`${styles.input} ${className}`} />
}

export default Input
