import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import sticker from '../assets/images/sidebar.svg'
// import { Logo } from "./images";

const theme = createTheme({
  palette: {
    primary: {
      main: '#83C5BE',
    },
    secondary: {
      main: '#E29578',
    },
  },
});

export default function Appbar() {

  const { user, checkAuth, logout } = useAuth();

  const navigate = useNavigate()
  const foo = ()=>{
    logout();
    navigate("/")
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20vw',
    minWidth: '300px',
    borderRight: '3px solid #83C5BE'
  }

  const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#83c5be',
    color: '#006D77',
    textTransform: 'lowercase'
  }

  return (
      <Box sx={sidebarStyle}>
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
          <Typography sx={{}}>Logo</Typography>
        </Box>
        <Box  sx={{padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Button sx={btnStyle}>Домашнее задание</Button>
              <Button sx={btnStyle}>Эссе</Button>
              <Button sx={btnStyle} onClick={foo}>Выйти из аккаунта</Button>
            </Box>
            <Box>
              <img src={sticker} alt="" style={{width: '200px'}} />
            </Box>
            <Box>
              <Typography variant='p'>footer</Typography>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
  );
}
