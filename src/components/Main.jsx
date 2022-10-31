import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import sticker from '../assets/images/startlesson.svg';
import avatar from '../assets/images/images.png'

const avatarImg = {
    width: '70px',
    borderRadius: '50%',
}

const calendar = {
    width: '20px',
    height: '20px',
    mx: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    bgcolor: '#edf6f9',
}

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
                            <img src={avatar} alt="avatar" style={avatarImg} />
                            <Typography variant='h6'>Ваш баланс: 200</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>



            <Box >
                <Paper elevation={1} sx={{ m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9', 
                    borderRadius: "10px", display: 'flex', flexDirection:'column', justifyContent: 'space-evenly', alignItems: 'space-between'}}>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <Typography variant="h6" sx={{ml: 5, color: '#006d77'}}>Ваш прогресс</Typography>
                        <Typography variant="h6" sx={{color: '#006d77'}}>7/10 выполнено</Typography>
                   </Box>
                    <Box sx={{ml: 5, width: '90%', height:'50px', bgcolor: '#83C5BE', borderRadius: '10px'}}>
                        <Box sx={{width: '70%', height: '100%', bgcolor: '#E29578', borderRadius: '10px'}}></Box>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{width: '47%'}}>
                    <Paper elevation={1} sx={{ m: 2,height: '28vh', maxHeight: "220px", width: "100%", p: 2, bgcolor:'#EDF6F9',  
                        borderRadius: "10px 10px 10px 50px"}}>
                        <Typography sx={{ml: 5, color: '#006d77'}}>Расписание</Typography>
                        <Box sx={{padding: '20px 30px', height: '100%', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                            <Paper elevation={2} sx={calendar}>1</Paper>
                            <Paper elevation={2} sx={calendar}>2</Paper>
                            <Paper elevation={2} sx={calendar}>3</Paper>
                            <Paper elevation={2} sx={calendar}>4</Paper>
                            <Paper elevation={2} sx={calendar}>5</Paper>
                            <Paper elevation={2} sx={calendar}>6</Paper>
                            <Paper elevation={2} sx={calendar}>7</Paper>
                            <Paper elevation={2} sx={calendar}>8</Paper>
                            <Paper elevation={2} sx={calendar}>9</Paper>
                            <Paper elevation={2} sx={calendar}>10</Paper>
                            <Paper elevation={2} sx={calendar}>11</Paper>
                            <Paper elevation={2} sx={calendar}>12</Paper>
                            <Paper elevation={2} sx={calendar}>13</Paper>
                            <Paper elevation={2} sx={{...calendar, bgcolor: '#83c5be'}}>14</Paper>
                            <Paper elevation={2} sx={calendar}>15</Paper>
                            <Paper elevation={2} sx={{...calendar, bgcolor: '#83c5be'}}>16</Paper>
                            <Paper elevation={2} sx={calendar}>17</Paper>
                            <Paper elevation={2} sx={{...calendar, bgcolor: '#83c5be'}}>18</Paper>
                            <Paper elevation={2} sx={calendar}>19</Paper>
                            <Paper elevation={2} sx={calendar}>20</Paper>
                            <Paper elevation={2} sx={calendar}>21</Paper>
                            <Paper elevation={2} sx={{...calendar, bgcolor: '#83c5be'}}>22</Paper>
                            <Paper elevation={2} sx={calendar}>23</Paper>
                            <Paper elevation={2} sx={{...calendar, bgcolor: '#83c5be'}}>24</Paper>
                            <Paper elevation={2} sx={calendar}>25</Paper>
                            <Paper elevation={2} sx={calendar}>26</Paper>
                            <Paper elevation={2} sx={calendar}>27</Paper>
                            <Paper elevation={2} sx={calendar}>28</Paper>
                            <Paper elevation={2} sx={calendar}>29</Paper>
                            <Paper elevation={2} sx={calendar}>30</Paper>
                        </Box>
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