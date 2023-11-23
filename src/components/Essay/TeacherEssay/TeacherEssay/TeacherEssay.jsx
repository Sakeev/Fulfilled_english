import { useEssay } from 'contexts/EssayContextProvider'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useEffect } from 'react'

import correct from 'assets/images/correct.png'
import incorrect from 'assets/images/cross.png'

import '../TeacherEssay.css'

const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#9bd0cb',
    color: '#006D77',
    textTransform: 'upper',
    '&:hover': {
        backgroundColor: '#006D77',
        color: '#9bd0cb',
    },
}

// localhost/room/essa/ POST - Create essay for student
// localhost/room/get_lesson/ GET - Get lesson for teacher and for student
// localhost/room/essa/ PATCH - Check student essay for teacher

const TeacherEssay = () => {
    const { loading, getLessons, lessons, setEssay } = useEssay()

    useEffect(() => {
        getLessons()
    }, [])

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className="essay-container">
            <div className="essay-headers">
                <h2>Students list</h2>
            </div>
            <div className="essay-columns">
                <p>Email:</p>
                <p>Essay theme:</p>
                <p>Deadline:</p>
                <p>Status:</p>
            </div>
            <ul className="essay-students-list">
                {lessons.map((lesson) => {
                    return lesson.map((unit, index) => {
                        if (!unit.essay[0]) return null
                        const essay = unit.essay[0]

                        return (
                            <li className="essay-student" key={index}>
                                <div
                                    className="essay-student-info"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <p>{unit.user.email}</p>
                                    <p>{essay.title}</p>
                                    <p>{essay.deadline}</p>
                                    <div className="essay-icon">
                                        <img
                                            src={
                                                essay.user_essay[0]
                                                    ? correct
                                                    : incorrect
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    disabled={
                                        essay.user_essay[0]
                                            ? essay.user_essay[0].checked
                                            : true
                                    }
                                    sx={{
                                        ...btnStyle,
                                        width: 'auto',
                                        whiteSpace: 'nowrap',
                                        marginRight: '5%',
                                    }}
                                    onClick={() => {
                                        if (essay.user_essay[0])
                                            setEssay(essay.user_essay[0])
                                    }}
                                >
                                    <Link to={`/essay/view/${unit.user?.id}`}>
                                        {essay.user_essay[0]?.checked
                                            ? 'essay have sent'
                                            : 'view essay'}
                                    </Link>
                                </Button>
                            </li>
                        )
                    })
                })}
            </ul>
        </div>
    )
}

export default TeacherEssay
