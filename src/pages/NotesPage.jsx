import { Box } from '@mui/material'
import React from 'react'
import Notes from '../components/notes/Notes'

const NotesPage = () => {
    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'hidden',
                    display: 'flex',
                }}
            >
                <Notes />
            </Box>
        </>
    )
}

export default NotesPage
