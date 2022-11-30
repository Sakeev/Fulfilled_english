import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import './Profile.scss';

const Profile = () => {
    const navigate = useNavigate();

    const user = {
        name: 'Дастан',
        lastName: 'Буларкиев',
        birthDate: '07.05.2001',
        image: '../../assets/images/photo_2022-11-16 16.52.00.jpeg',
        aboutMe: '',
        something: '',
    };

    const btnStyle = {
        margin: '10px 5px',
        backgroundColor: '#83c5be',
        color: '#006D77',
        border: '1px solid #83c5be',
        textTransform: 'none',
    };

    console.log(user.image);

    return (
        <section className="profile">
            <div className="profile-user">
                <div className="profile-avatar">
                    <img
                        src={require('../../assets/images/photo_2022-11-16 16.52.00.jpeg')}
                        alt="User image"
                    />
                </div>
                <div className="profile-name-date">
                    <p>{user.name + ' ' + user.lastName}</p>
                    <span>{user.birthDate}</span>
                </div>
                <Button sx={btnStyle} onClick={() => navigate(-1)}>
                    Вернуться назад
                </Button>
            </div>
            <div className="profile-content">
                <div className="profile-title">
                    <h3>Публичный профиль</h3>
                    <p>Добавьте информацию о себе</p>
                </div>
                <div className="profile-info">
                    <div className="profile-info-container">
                        <div className="profile-info-inputs">
                            <h3>Основные сведения</h3>
                            <input
                                className="profile-input"
                                type="text"
                                placeholder="Имя"
                            />
                            <input
                                className="profile-input"
                                type="text"
                                placeholder="Фамилия"
                            />
                            <input
                                className="profile-input"
                                type="text"
                                placeholder="Основная компетенция"
                            />
                        </div>
                        <div className="profile-task-progress">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#006d77' }}
                                >
                                    Ваш прогресс
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#006d77' }}
                                >
                                    7/10 выполнено
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    bgcolor: '#83C5BE',
                                    borderRadius: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '70%',
                                        height: '100%',
                                        bgcolor: '#E29578',
                                        borderRadius: '10px',
                                    }}
                                ></Box>
                            </Box>
                        </div>
                        <Button sx={btnStyle}>Сохранить</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
