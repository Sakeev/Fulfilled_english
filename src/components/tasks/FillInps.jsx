import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTasks } from '../../contexts/TasksContextProvider'

const inputBox = {
    width: '80px',
    mr: 3,
    '& input': {
        padding: '5px',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#006D77',
        },
    },
}

const FillInps = ({ taskBox }) => {
    const { dispatch } = useTasks()
    const [inps, setInps] = useState({
        first: '',
        second: '',
    })
    const handleInp = (inps) => {
        dispatch({
            type: 'GET_INPS',
            payload: inps,
        })
    }

    useEffect(() => {
        handleInp(inps)
    }, [inps])
    // console.log(inps);
    return (
        <>
            <Box sx={taskBox}>
                <Typography variant="h6" color="secondary">
                    Упражнение № 2
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        padding: '20px 0',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        sx={inputBox}
                        onChange={(e) =>
                            setInps({ ...inps, first: e.target.value })
                        }
                    ></TextField>
                    <Typography>you</Typography>
                    <TextField
                        sx={{ ...inputBox, ml: 3 }}
                        onChange={(e) =>
                            setInps({ ...inps, second: e.target.value })
                        }
                    ></TextField>
                    <Typography>in God?</Typography>
                </Box>
            </Box>
        </>
    )
}

export default FillInps
