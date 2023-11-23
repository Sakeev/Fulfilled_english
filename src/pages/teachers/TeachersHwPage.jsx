import React from 'react'
import HWStudentList from './HWStudentList'
import { Box } from '@mui/material'

const TeachersHwPage = () => {
    return (
        <div>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'scroll',
                    display: 'flex',
                }}
            >
                <HWStudentList />
            </Box>
        </div>
    )
}

export default TeachersHwPage
