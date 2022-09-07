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
// import { Logo } from "./images";

export default function Appbar() {

  const { user, checkAuth, logout } = useAuth();

  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <img src={Logo} alt="" /> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} navigate={'/'}>
          Fulfilled english
          </Typography>
          <Button color="inherit" onClick={()=>{logout()}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
