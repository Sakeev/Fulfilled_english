import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { API } from '../../../helpers/consts'
import './Tasks.css'

const ConnectWords = ({ task, inps, setInps, chatRender }) => {
    const [inpsCount] = useState(task[0]?.flag || 0)

    function handleHtmlChange1(e, inp) {
        setInps({
            ...inps,
            ['connect_words1' + task[0].id + inp]: e.target.value,
        })
        chatRender({
            ...inps,
            ['connect_words1' + task[0].id + inp]: e.target.value,
        })
    }

    function handleHtmlChange2(e, inp) {
        setInps({
            ...inps,
            ['connect_words2' + task[0].id + inp]: e.target.value,
        })
        chatRender({
            ...inps,
            ['connect_words2' + task[0].id + inp]: e.target.value,
        })
    }

    const inputArray = []
    for (let i = 1; i <= inpsCount; i++) {
        inputArray.push(i)
    }

    return (
        <Box className="connect_words">
            <h2>Connect words</h2>
            <Box className="connect_words__block">
                {task?.map((elem, index) => {
                    return (
                        elem?.images[0] && (
                            <img
                                key={index}
                                src={API + elem?.images[0]?.image}
                                style={{
                                    maxWidth: elem?.images[0]?.size,
                                    margin: '10px 0',
                                }}
                                alt=""
                            />
                        )
                    )
                })}
                {task?.map((elem, index) => (
                    <Box key={index}>
                        <h3 style={{ color: 'rgb(0 0 0 / 80%)' }}>
                            {elem.condition}
                        </h3>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%',
                                margin: '10px 0',
                            }}
                        >
                            <Box>
                                <h4
                                    style={{
                                        margin: '4px 0',
                                        color: 'rgb(0 0 0 / 80%)',
                                    }}
                                >
                                    Column A
                                </h4>
                                {elem.description1.map((item, index) => (
                                    <Box
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            color: '#006d77',
                                        }}
                                    >
                                        {item}
                                    </Box>
                                ))}
                            </Box>
                            <Box>
                                <h4
                                    style={{
                                        margin: '4px 0',
                                        color: 'rgb(0 0 0 / 80%)',
                                    }}
                                >
                                    Column B
                                </h4>
                                {elem.description2.map((item, index) => (
                                    <Box
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            color: '#e29578',
                                        }}
                                    >
                                        {item}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ))}
                {inputArray.map((inp, index) => (
                    <React.Fragment key={index}>
                        <h5>Exercise {inp}</h5>
                        <Box key={inp} className="connect_words__inputs">
                            <textarea
                                className="connect_words__textarea"
                                value={
                                    inps['connect_words1' + task[0].id + inp] ||
                                    ''
                                }
                                onChange={(e) => handleHtmlChange1(e, inp)}
                            />
                            <textarea
                                className="connect_words__textarea"
                                value={
                                    inps['connect_words2' + task[0].id + inp] ||
                                    ''
                                }
                                onChange={(e) => handleHtmlChange2(e, inp)}
                            />
                        </Box>
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    )
}

export default ConnectWords
