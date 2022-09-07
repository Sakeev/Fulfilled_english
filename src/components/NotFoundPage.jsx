import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const NotFoundPage = () => {
    return (
        <>
            <Box sx={{display: "flex",}}>
            <Typography variant={'h4'} sx={{ m: "30px auto"}}>
            Not Found Page 404
            </Typography>
            </Box>
        </>
    );
};

export default NotFoundPage;