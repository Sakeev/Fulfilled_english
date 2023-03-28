import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useAuth } from '../../contexts/AuthContextProvider';
import { useState } from 'react';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <Link color="inherit" href="#">
                © Fulfilled english
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        login,
        errorObj: { emailError, passwordError },
        isLoading,
    } = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4" mb={2}>
                            Авторизация
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                error={emailError.status}
                                helperText={
                                    emailError.status ? emailError.message : ''
                                }
                                fullWidth
                                id="email"
                                label="Почта"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <TextField
                                margin="normal"
                                error={passwordError.status}
                                helperText={
                                    passwordError.status
                                        ? passwordError.message
                                        : ''
                                }
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Запомнить меня"
                            />
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => login(email, password)}
                                loading={isLoading}
                            >
                                Войти
                            </LoadingButton>

                            {/* <Grid container>
                                <Grid item sx={{ margin: '0 auto' }}>
                                    <Link href="/register" variant="body2">
                                        {'Нет аккаунта? Зарегистрируйся'}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
