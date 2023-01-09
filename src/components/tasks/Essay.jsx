import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Essay = () => {
    const [essey , setEssay] = useState('');
    let API=`sulaLoh228`

    const sendEssay = async (essey)=>{
       const data =  await axios.post(API , essey);
    }
    return (
        <div style={{width:"100%" , height:"100%"}}>
            <Box sx={{paddingLeft:"20%" , paddingTop:"5%" , width:"100%" , height:"100%" , display:"flex" , flexDirection:"column"}}>
                <Typography sx={{paddingBottom:"5%" , color:"#006D77" , fontWeight:"bold" , fontSize:"32px"}}>
                    Essay
                </Typography>
                <Box sx={{display:"flex" , alignItems:"center"  , paddingBottom:"5%"}}>
                <Typography sx={{paddingRight:"51.5%" , color:"#006D77" , fontSize:"24px" , fontWeight:"bold"}}>
                    Тема:
                </Typography>
                <Button sx={{backgroundColor:"#83C5BE" , color:"#006D77"}}>перевести</Button>
                </Box>
                <textarea onChange={(e)=>setEssay(e.target.value)} style={{width:"70%" , height:"50%" , borderRadius:"22px" , border:"2px solid #006D77" , marginBottom:"5%", padding: '20px', fontSize: '20px'}} />
                <Button onClick={()=>sendEssay(essey)} sx={{backgroundColor:"#83C5BE" , color:"#006D77" , width:"12%" }}>Отправить</Button>
            </Box>
            
        </div>
    );
};

export default Essay;