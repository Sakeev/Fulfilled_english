import { useEssay } from '../../../contexts/EssayContextProvider';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect } from 'react';

import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/cross.png';

import './TeacherEssay.css';

const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#9bd0cb',
    color: '#006D77',
    textTransform: 'upper',
    '&:hover': {
        backgroundColor: '#006D77',
        color: '#9bd0cb',
    },
};

// localhost/room/essa/ POST - Create essay for student
// localhost/room/get_lesson/ GET - Get lesson for teacher and for student
// localhost/room/essa/ PATCH - Check student essay for teacher

const TeacherEssay = () => {
    const { loading, getLessons, lessons, setEssay } = useEssay();

    useEffect(() => {
        getLessons();
    }, []);

    console.log(lessons);

    // const [editTitle, setEditTitle] = useState(false);
    // const [editTitleId, setEditTitleId] = useState(null);
    // const [essayTitle, setEssayTitle] = useState('');

    // const essayTitleObj = {
    //     editTitle,
    //     setEditTitle,
    //     editTitleId,
    //     setEditTitleId,
    //     essayTitle,
    //     setEssayTitle,
    // };

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
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
            {/* {!students.length && <h2>You haven't students yet</h2>} */}
            <ul className="essay-students-list">
                {lessons.map((lesson, index) => {
                    if (!lesson.essay[0]) return null;
                    const essay = lesson.essay[0];

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
                                <p>{lesson.user.email}</p>
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
                                        setEssay(essay.user_essay[0]);
                                }}
                            >
                                <Link to={`/essay/view/${lesson.user?.id}`}>
                                    {essay.user_essay[0]?.checked
                                        ? 'essay have sent'
                                        : 'view essay'}
                                </Link>
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TeacherEssay;
