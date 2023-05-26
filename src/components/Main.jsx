import { Box, Modal, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import sticker from '../assets/images/startlesson.svg';
import avatar from '../assets/images/images.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import HomePageSchedule from './teachers/HomePageSchedule';
import { useEffect } from 'react';
import CreateRoom from './classwork/CreateRoom';
import { isTeacher, timeFromMilliseconds } from '../helpers/funcs';
import { useClassWork } from '../contexts/ClassWorkContextProvider';
import api from '../http';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    '&:focus': {
        outline: 'none',
    },
};

const avatarImg = {
    width: '70px',
    borderRadius: '50%',
};

const calendar = {
    width: '20px',
    height: '20px',
    mx: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    bgcolor: '#edf6f9',
};

const Main = () => {
    const { isTeacher, getRoomOrRooms } = useAuth();
    const { getRoom } = useClassWork();
    const [isHover, setIsHover] = useState(false);
    const [isHoverProfile, setIsHoverProfile] = useState(false);
    const [progress, setProgress] = useState({
        lessonsQuantity: null,
        passedLessons: null,
    });
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [upcomingLesson, setUpcomingLesson] = useState(null);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setShowModal(false);
        }
    });

    useEffect(() => {
        getRoomOrRooms()
            .then((res) => {
                console.log(res);
                setProgress({
                    lessonsQuantity: res.count_lessons,
                    passedLessons: res.progres_classwork,
                });
            })
            .catch((err) => console.log(err));

        api.get('http://13.50.235.4/schedule/schedule/').then((res) => {
            let data = res.data;
            const today = new Date();
            data.sort((a, b) => a.weekday - b.weekday);
            data = data.filter(
                (table) => today < new Date(`${table.date} ${table.time}`)
            );
            if (data.length > 0) setUpcomingLesson(data[0]);
        });

        const countdown = setInterval(() => {
            setTimeLeft(
                timeFromMilliseconds(
                    new Date(`${upcomingLesson.date} ${upcomingLesson.time}`)
                )
            );
        }, 1000);
        // api.get('http://13.50.235.4/chat/room/').then((res) =>
        //     console.log(res)
        // );
        return () => clearInterval(countdown);
    }, []);

    const studentProgress = Math.round(
        (100 / progress.lessonsQuantity) * progress.passedLessons
    );

    const handleMouseOver = (setFunc) => {
        setFunc(true);
    };

    const handleMouseOut = (setFunc) => {
        setFunc(false);
    };

    const handleClassWork = () => {
        getRoom();
    };

    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                width: '75vw',
                padding: '0 2%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '65%' }}>
                    <Paper
                        elevation={isHover ? 16 : 1}
                        sx={{
                            m: 2,
                            height: '28vh',
                            cursor: 'pointer',
                            maxHeight: '220px',
                            width: '100%',
                            p: 2,
                            bgcolor: '#EDF6F9',
                            borderRadius: '50px 10px 10px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        onClick={() => {
                            if (isTeacher) {
                                setShowModal(true);
                            } else {
                                handleClassWork();
                            }
                        }}
                        onMouseOver={() => handleMouseOver(setIsHover)}
                        onMouseOut={() => handleMouseOut(setIsHover)}
                    >
                        <Box
                            sx={{
                                height: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="p" sx={{ color: '#83C5BE' }}>
                                {upcomingLesson
                                    ? `До занятия осталось: ${timeLeft}`
                                    : 'У вас нет занятий на этой неделе'}
                            </Typography>
                            {isTeacher ? (
                                <Typography
                                    variant="h5"
                                    sx={{ color: '#006D77' }}
                                >
                                    Начать занятие
                                </Typography>
                            ) : null}
                        </Box>
                        <img
                            style={{ width: '20%', margin: '0 0 20px 0' }}
                            src={sticker}
                            alt=""
                        />
                    </Paper>
                    <Modal
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <CreateRoom />
                        </Box>
                    </Modal>
                </Box>
                <Box sx={{ width: '30%' }}>
                    <Paper
                        elevation={isHoverProfile ? 16 : 1}
                        sx={{
                            m: 2,
                            height: '28vh',
                            maxHeight: '220px',
                            width: '100%',
                            p: 2,
                            bgcolor: '#EDF6F9',
                            borderRadius: '10px 50px 10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/profile')}
                        onMouseOver={() => handleMouseOver(setIsHoverProfile)}
                        onMouseOut={() => handleMouseOut(setIsHoverProfile)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                                color: '#006d77',
                            }}
                        >
                            <Typography variant="h6">Профиль</Typography>
                            <img src={avatar} alt="avatar" style={avatarImg} />
                            <Typography variant="h6">
                                Ваш баланс: 200
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {isTeacher ? null : (
                <Box>
                    <Paper
                        elevation={1}
                        sx={{
                            m: 2,
                            height: '28vh',
                            maxHeight: '220px',
                            width: '100%',
                            p: 2,
                            bgcolor: '#EDF6F9',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '90%',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ ml: 5, color: '#006d77' }}
                            >
                                Ваш прогресс
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#006d77' }}>
                                {progress.passedLessons}/
                                {progress.lessonsQuantity}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                ml: 5,
                                width: '90%',
                                height: '50px',
                                bgcolor: '#83C5BE',
                                borderRadius: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: studentProgress + '%',
                                    height: '100%',
                                    bgcolor: '#E29578',
                                    borderRadius: '10px',
                                }}
                            ></Box>
                        </Box>
                    </Paper>
                </Box>
            )}

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '47%' }}>
                    <Paper
                        elevation={1}
                        sx={{
                            m: 2,
                            height: '28vh',
                            maxHeight: '220px',
                            width: '100%',
                            p: 2,
                            bgcolor: '#EDF6F9',
                            borderRadius: '10px 10px 10px 50px',
                        }}
                    >
                        <Typography sx={{ ml: 5, color: '#006d77' }}>
                            Расписание
                        </Typography>
                        <Box
                            sx={{
                                padding: '20px 30px',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Paper elevation={2} sx={calendar}>
                                1
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                2
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                3
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                4
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                5
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                6
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                7
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                8
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                9
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                10
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                11
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                12
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                13
                            </Paper>
                            <Paper
                                elevation={2}
                                sx={{ ...calendar, bgcolor: '#83c5be' }}
                            >
                                14
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                15
                            </Paper>
                            <Paper
                                elevation={2}
                                sx={{ ...calendar, bgcolor: '#83c5be' }}
                            >
                                16
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                17
                            </Paper>
                            <Paper
                                elevation={2}
                                sx={{ ...calendar, bgcolor: '#83c5be' }}
                            >
                                18
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                19
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                20
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                21
                            </Paper>
                            <Paper
                                elevation={2}
                                sx={{ ...calendar, bgcolor: '#83c5be' }}
                            >
                                22
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                23
                            </Paper>
                            <Paper
                                elevation={2}
                                sx={{ ...calendar, bgcolor: '#83c5be' }}
                            >
                                24
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                25
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                26
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                27
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                28
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                29
                            </Paper>
                            <Paper elevation={2} sx={calendar}>
                                30
                            </Paper>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ width: '47%' }}>
                    <Paper
                        elevation={1}
                        sx={{
                            m: 2,
                            height: '28vh',
                            maxHeight: '220px',
                            width: '100%',
                            p: 2,
                            bgcolor: '#EDF6F9',
                            borderRadius: '10px 10px 50px 10px',
                        }}
                    >
                        Словарь (в разработке)
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Main;
