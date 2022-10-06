import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import sticker from '../assets/images/startlesson.svg'

const Main = () => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseOut = () => {
        setIsHover(false)
    }

    return (
        <Box sx={{mt: 1, display: 'flex', flexDirection: 'column', width: '75vw', padding: '0 2%' }}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Box sx={{width: '65%'}}>
                    <Paper elevation={isHover ? 16 : 1} sx={{m: 2,height: '28vh', cursor: 'pointer', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9', 
                        borderRadius: "50px 10px 10px", display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} onClick={()=>alert('вы начали занятие')} onMouseOver={()=>handleMouseOver()} onMouseOut={()=>handleMouseOut()}>
                        <Box sx={{height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Typography variant="p" sx={{color: '#83C5BE'}}>До занятия осталось: 5:43</Typography>
                            <Typography variant="h5" sx={{color: '#006D77'}}>Начать занятие</Typography>
                        </Box>
                        <img style={{width: '20%', margin: '0 0 20px 0'}} src={sticker} alt="" />
                    </Paper>
                </Box>
                <Box sx={{width: '30%'}}>
                    <Paper elevation={1} sx={{m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9',  
                        borderRadius: "10px 50px 10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',height: '100%', color: '#006d77'}}>
                            <Typography variant="h6">Профиль</Typography>
                            <Typography>Avatar</Typography>
                            <Typography variant='h6'>Ваш баланс: 200</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>



            <Box >
                <Paper elevation={1} sx={{ m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9', 
                    borderRadius: "10px", display: 'flex', flexDirection:'column', justifyContent: 'space-evenly', alignItems: 'space-between'}}>
                    <Typography variant="h6" sx={{ml: 5, color: '#006d77'}}>Ваш прогресс</Typography>
                    <Box sx={{ml: 5, width: '90%', height:'50px', bgcolor: '#83C5BE', borderRadius: '10px'}}>
                        <Box sx={{width: '70%', height: '100%', bgcolor: '#E29578', borderRadius: '10px'}}></Box>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{width: '47%'}}>
                    <Paper elevation={1} sx={{ m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9',  
                        borderRadius: "10px 10px 10px 50px"}}>
                        Расписание (в разработке)
                    </Paper>
                </Box>
                <Box sx={{width: '47%'}}>
                    <Paper elevation={1} sx={{ m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9',  
                        borderRadius: "10px 10px 50px 10px"}}>
                        Словарь (в разработке)
                    </Paper>
                </Box>
            </Box>
        </Box>


    );
};

export default Main;