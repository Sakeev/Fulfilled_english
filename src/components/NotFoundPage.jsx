import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

const NotFoundPage = () => {
    // const navigate = useNavigate()
    // const {user} = useAuth()
    // useEffect(()=>{
    //     !user? navigate('/'): navigate('/home')
    // },[])
    return (
        <>
            <Box sx={{display: "flex",}}>
                <Typography variant={'h4'} sx={{ m: "30px auto"}}>
                    {/* Not Found Page 404 */}
                </Typography>
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            </Box>
        </>
    );
};

export default NotFoundPage;