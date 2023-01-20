import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#9bd0cb',
    color: '#006D77',
    textTransform: 'upper',
    '&:hover': {
        backgroundColor: '#006D77',
        color: '#9bd0cb',
    },
};

const Essay = () => {
    const [essay, setEssay] = useState('');
    console.log(essay);
    const API = 'http://35.238.162.84/room/essa/';

    const sendEssay = async (essay) => {
        const data = await axios.get(API);
        console.log(data);
        // const data = await axios.post(API, essay);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Box
                sx={{
                    paddingLeft: '20%',
                    paddingTop: '5%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        paddingBottom: '5%',
                        color: '#006D77',
                        fontWeight: 'bold',
                        fontSize: '32px',
                    }}
                >
                    Essay
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingBottom: '5%',
                    }}
                >
                    <Typography
                        sx={{
                            paddingRight: '51.5%',
                            color: '#006D77',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Тема:
                    </Typography>
                    <Button sx={btnStyle}>перевести</Button>
                </Box>
                <textarea
                    onChange={(e) => setEssay(e.target.value)}
                    style={{
                        width: '70%',
                        height: '50%',
                        borderRadius: '16px',
                        border: '2px solid #006D77',
                        marginBottom: '5%',
                        padding: '0.5rem 0.75rem',
                        resize: 'none',
                    }}
                ></textarea>
                <Button
                    onClick={() => sendEssay(essay)}
                    sx={{
                        ...btnStyle,
                        width: '12%',
                    }}
                >
                    Отправить
                </Button>
            </Box>
        </div>
    );
};

export default Essay;
