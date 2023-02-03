import { useEssay } from '../../contexts/EssayContextProvider';
import { useAuth } from '../../contexts/AuthContextProvider';
import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../components/tasks/Essay/Essay.css';
import api from '../../http';

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

const ViewEssay = () => {
    const [essayText, setEssayText] = useState('');
    const params = useParams();
    console.log(params);

    const { getEssay, essay } = useEssay();
    const { userId, isTeacher } = useAuth();

    useEffect(() => {
        getEssay(params.essayId);
    }, []);

    const sendEssay = async () => {
        // await api.patch(`${API}room/essa/${essay.id}/`, data);
        // getEssay();
    };

    if (!essay.id) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Box
                sx={{
                    width: '60%',
                    margin: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Typography
                    sx={{
                        paddingBottom: '1%',
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingBottom: '3%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#006D77',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Theme: {essay.title}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        color: '#006D77',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        paddingBottom: '5%',
                    }}
                >
                    Description: {essay.description}
                </Typography>
                <textarea
                    className={essay.accepted ? 'unactive' : ''}
                    readOnly={essay.accepted}
                    onChange={(e) => setEssayText(e.target.value)}
                    value={essay.accepted ? essay.text : essayText}
                ></textarea>
            </Box>
        </div>
    );
};

export default ViewEssay;
