import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEssay } from '../../../contexts/EssayContextProvider';
import api from '../../../http';
import noEssay from '../../../assets/images/munara.jpeg';

import './Essay.css';
import { useAuth } from '../../../contexts/AuthContextProvider';

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
    const [essayText, setEssayText] = useState('');
    const [essayError, setEssayError] = useState(false);
    const [sent, setSent] = useState(false);
    // const [editText, setEditText] = useState();
    // const [highlightedParts, setHighlightedParts] = useState([]);
    // const textRef = useRef();
    // const colorInputRef = useRef();

    const { getEssay, essay } = useEssay();
    const { userId, isTeacher } = useAuth();

    useEffect(() => {
        getEssay();
    }, []);

    console.log(userId, isTeacher);

    const API = 'http://35.238.162.84/';

    const sendEssay = async () => {
        // if (essay.split(' ').length < 10) return setEssayError(true);
        const data = {
            text: essayText,
            accepted: true,
        };

        await api.patch(`${API}room/essa/${essay.id}/`, data);
        getEssay();
        console.log('success');
    };

    if (!essay.id) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    } else if (essay.id === -1) {
        return (
            <Typography
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#006D77',
                    fontWeight: 'bold',
                    fontSize: '32px',
                    margin: '10% auto 0',
                }}
            >
                Your teacher have not sent essay yet
                <img src={noEssay} alt="no essay" />
            </Typography>
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
                    <Button sx={btnStyle}>translate</Button>
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
                {essayError && (
                    <p style={{ marginBottom: '1rem', color: '#006D77' }}>
                        Эссе должно состоять минимум из 50 слов.
                    </p>
                )}
                <Button
                    disabled={essay.accepted}
                    onClick={() => sendEssay(essayText)}
                    sx={{
                        ...btnStyle,
                        width: 'auto',
                    }}
                >
                    {essay.accepted ? 'essay have sent' : 'send'}
                </Button>
            </Box>
        </div>
    );
};

export default Essay;
