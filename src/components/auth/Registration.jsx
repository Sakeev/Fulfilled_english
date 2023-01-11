import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="#">
      © Fulfilled english
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 220,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const theme = createTheme();

export default function Registration() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const navigate = useNavigate()

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [password_confirmation, setPassword_confirmation] = React.useState('');
const [full_name, setFull_name] = React.useState('');
const { token, error } = useAuth();

console.log(email , password);
function handleRegister() {
  token(email,password);
}


const modal = () => {
  if(
    email && password && password_confirmation && full_name
  ){
    handleOpen()
  }
}
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Активация аккаунта
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Мы отправили письмо на Вашу почту для активации аккаунта.
          </Typography>
        <Button variant='outlined' sx={{alignSelf: 'flex-end'}} onClick={()=>{handleClose(); navigate('/')}}>Закрыть</Button>
        </Box>
      </Modal>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display: 'flex', alignItems: 'center'}}>
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
              Регистрация
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus

                onChange={(e) => setFull_name(e.target.value)}
                value={full_name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Электронная почта"
                type="email"
                id="email"
                autoComplete="current-email"

                onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"

                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

<TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Повторите пароль"
                type="password"
                id="password_confirmation"
                autoComplete="current-password"

                onChange={(e) => setPassword_confirmation(e.target.value)}
                value={password_confirmation}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=> {token(email , password); modal()}}
                >
                Зарегистрироваться
              </Button>
              <Grid container>
                <Grid item sx={{margin: '0 auto'}}>
                  <Link href="/" variant="body2">
                    {"Войти"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}