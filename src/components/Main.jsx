import { Box, Grid, Paper } from '@mui/material';
import React from 'react';

const Main = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '75vw' }}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{width: '100%'}}>
                    <Paper elevation={3} sx={{m: 2, height: "220px", width: "65%", p: 2, bgcolor:'#EDF6F9', 
                    // border: "4px solid #121156",
                    borderRadius: "40px 15px 15px"}}>
        Вход на урок
                    </Paper>

                </Box>
                <Box >
                <Paper elevation={3} sx={{m: 2, height: "220px", width: "30%", p: 2, bgcolor:'#EDF6F9',  
                // border: "4px solid #121156",
                borderRadius: "15px 40px 15px"}}>
        Расписание
                    </Paper>
                </Box>
            </Box>



            <Box >
            <Paper elevation={3} sx={{ mx: 2, height: "220px", width: "1450px", p: 2, bgcolor:'#EDF6F9', 
            // border: "4px solid #121156",
            borderRadius: "10px 15px 15px 50px"}}>
            Прогресс ученика
                </Paper>
            </Box>
            <Box >
            </Box>


            <Box >
            <Paper elevation={3} sx={{ m: 2, height: "220px", width: "700px", p: 2, bgcolor:'#EDF6F9',  
            // border: "4px solid #121156",
            borderRadius: "15px 15px 15px 40px"}}>
            Баланс
                </Paper>
            </Box>
            <Box >
            <Paper elevation={3} sx={{ m: 2, height: "220px", width: "700px", p: 2, bgcolor:'#EDF6F9',  
            // border: "4px solid #121156",
            borderRadius: "15px 15px 40px 15px"}}>
            Словарь
                </Paper>
            </Box>
        </Box>


    );
};

export default Main;