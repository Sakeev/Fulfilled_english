import React from 'react'
import ScheduleTeachers from '../../components/teachers/ScheduleTeachers'

const container = {
    width: '100%',
    display: 'flex',
}

const SchedulePage = () => {
    return (
        <div style={container}>
            <ScheduleTeachers />
        </div>
    )
}

export default SchedulePage
