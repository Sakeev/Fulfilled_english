import React from 'react'
import { Box } from '@mui/material'
import Profile from '../components/Profile'

const ProfilePage = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                overflowY: 'hidden',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Profile />
        </Box>
    )
}

export default ProfilePage
