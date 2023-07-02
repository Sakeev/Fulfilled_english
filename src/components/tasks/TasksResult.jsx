import { useTasks } from '../../contexts/TasksContextProvider';
import { useAuth } from '../../contexts/AuthContextProvider';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './results.css';

const TasksResult = () => {
    const rightAnswers = {
        border: '2px solid #83C5BE',
        borderRadius: '22px',
        width: '40vw',
        height: '60vh',
        margin: '5%',
        fontSize: '24px',
        color: '#83C5BE',
    };

    const { id, task_id } = useParams();
    const { isTeacher } = useAuth();
    const { getAnswers, answers, handleTask, tasks, infoCase, caseInfo } =
        useTasks();

    console.log(caseInfo);

    useEffect(() => {
        infoCase(id);
        getAnswers();
        handleTask();
    }, []);

    const [color, setColor] = useState('#83C5BE');
    const [text, setText] = useState('');
    const [dis, setDis] = useState('none');
    const [block, setBlock] = useState('none');
    const results = [];

    caseInfo.tasks?.forEach((item) => {
        results.push(item.answers[item.answers.length - 1]?.accepted);
    });

    const isAllTrue = results.every((item) => {
        return item === true;
    });

    const colorManager = () => {
        isAllTrue ? setColor('#83C5BE') : setColor('#E29578');
    };

    const textManager = () => {
        isAllTrue
            ? setText('')
            : setText(`Сообщение о том, что возможно
        ваш ответ правильный, он просто
        не совпал с нашим. So due to гибкость
        англ языка, мы предоставляем вам 
        правильные ответы, что бы вы сами
        могли сравнить`);
    };

    const displayManager = () => {
        isAllTrue ? setDis('none') : setDis('flex');
    };

    useEffect(() => {
        colorManager();
        displayManager();
        textManager();
    }, [isAllTrue]);

    const yourAnswer = {
        border: `2px solid ${color}`,
        borderRadius: '22px',
        width: '40vw',
        height: '60vh',
        margin: '5%',
        fontSize: '24px',
    };

    if (isTeacher) {
        return (
            <>
                <div>
                    <div>
                        <h1 style={{ margin: '3%' }}>Tasks</h1>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '70%',
                            margin: '0 auto',
                            alignItems: 'center',
                        }}
                    >
                        <p style={{ fontSize: '24px' }}>Present Simple</p>
                        <div
                            className="main"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <div className="text" style={{ marginRight: '2%' }}>
                                <p
                                    className="parag"
                                    style={{
                                        margin: '3%',
                                        fontWeight: 'bolder',
                                    }}
                                >
                                    {text}
                                </p>
                            </div>
                            <div
                                className="sign"
                                style={{
                                    backgroundColor: '#83C5BE',
                                    borderRadius: '50%',
                                    width: '48px',
                                    height: '48px',
                                    textAlign: 'center',
                                    display: `${dis}`,
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                }}
                            >
                                <p style={{ alignSelf: 'center' }}>?</p>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            margin: '0 auto',
                            width: '80%',
                        }}
                    >
                        <div style={yourAnswer}>
                            <p
                                style={{
                                    fontSize: '24px',
                                    margin: '5%',
                                    textAlign: 'center',
                                    color: `${color}`,
                                }}
                            >
                                Your answers
                            </p>
                            {caseInfo.tasks?.map((item, index) => (
                                <div key={item.id}>
                                    {item.answers[item.answers.length - 1]
                                        ?.accepted ? (
                                        <p
                                            style={{
                                                color: `#83C5BE`,
                                                margin: '5%',
                                            }}
                                        >
                                            {' '}
                                            {index + 1}.{' '}
                                            {
                                                item.answers[
                                                    item.answers.length - 1
                                                ]?.answer
                                            }
                                        </p>
                                    ) : (
                                        <p
                                            style={{
                                                color: `#E29578`,
                                                margin: '5%',
                                            }}
                                        >
                                            {' '}
                                            {index + 1}.{' '}
                                            {
                                                item.answers[
                                                    item.answers.length - 1
                                                ]?.answer
                                            }
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div style={rightAnswers}>
                            <p
                                style={{
                                    fontSize: '24px',
                                    margin: '5%',
                                    textAlign: 'center',
                                }}
                            >
                                Right answer
                            </p>
                            {caseInfo.tasks?.map((item, index) => (
                                <div key={item.id}>
                                    <p
                                        style={{
                                            color: '#83C5BE',
                                            margin: '5%',
                                        }}
                                    >
                                        {' '}
                                        {index + 1}. {item.right_answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div style={{ width: '200%', margin: '0 auto' }}>
                    <h1 style={{ margin: '3%' }}>Tasks</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div></div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '70%',
                                margin: '0 auto',
                                alignItems: 'center',
                            }}
                        >
                            <p style={{ fontSize: '24px' }}>Present Simple</p>
                            <div
                                className="main"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    className="text"
                                    style={{ marginRight: '2%' }}
                                >
                                    <p
                                        className="parag"
                                        style={{
                                            margin: '3%',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        {text}
                                    </p>
                                </div>
                                <div
                                    className="sign"
                                    style={{
                                        backgroundColor: '#83C5BE',
                                        borderRadius: '50%',
                                        width: '48px',
                                        height: '48px',
                                        textAlign: 'center',
                                        display: `${dis}`,
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                    }}
                                >
                                    <p style={{ alignSelf: 'center' }}>?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginLeft: '22%',
                            width: '80%',
                        }}
                    >
                        <div style={yourAnswer}>
                            <p
                                style={{
                                    fontSize: '24px',
                                    margin: '5%',
                                    textAlign: 'center',
                                    color: `${color}`,
                                }}
                            >
                                Your answers
                            </p>
                            {caseInfo.tasks?.map((item, index) => (
                                <div key={item.id}>
                                    {item.answers[item.answers.length - 1]
                                        ?.accepted ? (
                                        <p
                                            style={{
                                                color: `#83C5BE`,
                                                margin: '5%',
                                            }}
                                        >
                                            {' '}
                                            {index + 1}.{' '}
                                            {
                                                item.answers[
                                                    item.answers.length - 1
                                                ]?.answer
                                            }
                                        </p>
                                    ) : (
                                        <p
                                            style={{
                                                color: `#E29578`,
                                                margin: '5%',
                                            }}
                                        >
                                            {' '}
                                            {index + 1}.{' '}
                                            {
                                                item.answers[
                                                    item.answers.length - 1
                                                ]?.answer
                                            }
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default TasksResult;
