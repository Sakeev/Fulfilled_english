import { useTasks } from '../contexts/TasksContextProvider'
import { Box } from '@mui/material'
import HWResults from 'components/tasks/HWResults/HWResults'
import { useEffect } from 'react'

const TasksResultPage = () => {
    const { getAnswers } = useTasks()

    useEffect(() => {
        getAnswers()
    }, [])

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <HWResults />
            </Box>
        </Box>
    )
}

export default TasksResultPage
