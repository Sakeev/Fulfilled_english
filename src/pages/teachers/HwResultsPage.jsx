import React from 'react';
import HwResults from './HwResults';
import { Box } from '@mui/material';
const HwResultsPage = () => {
    return (
        <div>
            <Box
                sx={{
                    height: '100%',
                    //   overflowY: "hidden",
                    display: 'flex',
                }}
            >
                <HwResults />
            </Box>
        </div>
    );
};

export default HwResultsPage;
