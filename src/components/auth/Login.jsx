import { useAuth } from '../../contexts/AuthContextProvider'
import { useState } from 'react'
import './Auth.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        login,
        errorObj: { emailError, passwordError },
        isLoading,
    } = useAuth()

    return (
        <>
            <div className="container">
                <div className="auth_block">
                    <h2>Login</h2>
                    <div className="auth_inps">
                        <form
                            action=""
                            onSubmit={(e) => {
                                e.preventDefault()
                                login(email, password)
                            }}
                        >
                            <input
                                className={emailError.status ? 'inp_error' : ''}
                                type="text"
                                placeholder="email"
                                name="email_inp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError.status ? (
                                <span className="auth_error">
                                    {emailError.message}
                                </span>
                            ) : (
                                <></>
                            )}
                            <input
                                className={
                                    passwordError.status ? 'inp_error' : ''
                                }
                                type="password"
                                placeholder="password"
                                name="password_inp"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError.status ? (
                                <span className="auth_error">
                                    {passwordError.message}
                                </span>
                            ) : (
                                <></>
                            )}
                            {isLoading ? (
                                <button type="submit" className="btn-loader">
                                    <div className="lds-ellipsis">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </button>
                            ) : (
                                <button type="submit">Login</button>
                            )}
                        </form>
                    </div>
                    <div className="auth_downpart">
                        <h5>© Fluent English 2023</h5>
                        <img src="/images/logo.png" alt="logo" />
                    </div>
                </div>
            </div>
        </>
    )
}
