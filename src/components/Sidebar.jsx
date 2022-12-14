import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import sticker from '../assets/images/sidebar.svg'
import Logo from "../assets/images/logo.png";

const theme = createTheme({
  palette: {
    primary: {
      main: '#9bd0cb',
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
    width: '18vw',
    minWidth: '200px',
    height: '100vh',
    // boxShadow: '4px 0px 10px -2px rgba(115,115,115,0.75)',
    borderRight: '2px solid #9bd0cb',
    position: 'fixed',
  }

  const sidebarContainer = {
    maxWidth: '20vw',
    width: "18vw",
    minWidth: '200px',
  }

  const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#9bd0cb',
    color: '#006D77',
    textTransform: 'none',
    "&:hover": {
      backgroundColor: '#006D77',
      color: '#9bd0cb'
    }
  }

  function Copyright(props) {
    return (
      <Typography
        variant="body3"
        color="text.secondary"
        align="center"
        {...props}

      >
        {'Copyright © '}Fluently English {new Date().getFullYear()}{'.'}
      </Typography>
    );
  }

  return (
    <Box sx={sidebarContainer}>
      <Box sx={sidebarStyle}>
        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 5, cursor: 'pointer'}} onClick={()=>navigate('/')}>
          <img src={Logo} alt="logo" style={{width: '50px', marginLeft: '40px', mt: 2}}/>
          <Typography variant="h6" style={{marginLeft: '20px', color: '#006d77'}}>Fluently English</Typography>
        </Box>
        <Box  sx={{padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', mt: 5}}>
          <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Button sx={btnStyle} onClick={()=>navigate('/tasks')}>Домашнее задание</Button>
              <Button sx={btnStyle} onClick={()=>navigate('/essay')}>Эссе</Button>
              <Button sx={btnStyle} onClick={()=>navigate('/students')}>Студенты</Button>
              <Button sx={btnStyle} onClick={foo}>Выйти из аккаунта</Button>
            </Box>
            <Box>
              <img src={sticker} alt="" style={{width: '20vmin'}} />
            </Box>
            <Box>
              <Typography variant='p'>
                <Copyright sx={{ fontSize: '12px', display:'flex', justifyContent: 'center'}} />
              </Typography>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
}
