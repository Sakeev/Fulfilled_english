// import { Button } from '@mui/material';
// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { useTasks } from '../../../contexts/TasksContextProvider';

// import './tasksType.css';

// const BuildDialog = ({
//     taskBox,
//     handleCaseDetail,
//     id,
//     task_id,
//     caseDetail,
//     descr,
//     handleAnswer,
//     caseInfo,
// }) => {
//     const { dispatch } = useTasks();
//     const [words, setWords] = useState([]);
//     useEffect(() => {
//         handleCaseDetail(id, task_id);
//     }, []);

//     useEffect(() => {
//         setWords([caseDetail?.description.split(' ')]);
//     }, [task_id]);

//     useEffect(() => {
//         if (caseDetail) {
//             setWords([caseDetail?.description.split(' ')]);
//         }
//     }, [caseDetail]);

//     const checkFields = () => {
//         let res = [];
//         for (let i = 0; i < words.length; i++) {
//             res.push([]);
//         }
//         return res;
//     };

//     useEffect(() => {
//         setAnswer(checkFields());
//     }, [words]);

//     const [answer, setAnswer] = useState([]);

//     const handleWord = (ind, index) => {
//         let pickedWord = words[index].splice(ind, 1);
//         let newAns = [];
//         newAns.push(pickedWord[0]);
//         let res = [...answer];
//         res[index] = res[index].concat([...newAns]);

//         setAnswer(res);

//         dispatch({
//             type: 'GET_SENT',
//             payload: res,
//         });
//     };

//     const handleWordBack = (ind, index) => {
//         words[index].splice(ind, 0, answer[index][ind]);
//         let newAns = [...answer];
//         newAns[index].splice(ind, 1);
//         setAnswer(newAns);
//         dispatch({
//             type: 'GET_SENT',
//             payload: newAns,
//         });
//     };
//     const str = answer[0]?.join(' ');

//     const obj = {
//         answers: str,
//     };

//     return (
//         <div className="build-dialog-container task-types-container">
//             <div className="build-dialog-task-box">
//                 <div>
//                     {words.map((item, index) => {
//                         return (
//                             <div key={index}>
//                                 <div
//                                     className="build-dialog-words-box"
//                                     key={'id' + index}
//                                 >
//                                     {item.map((word, ind) => (
//                                         <p
//                                             key={'inner' + ind}
//                                             onClick={() => {
//                                                 handleWord(ind, index);
//                                             }}
//                                         >
//                                             {word}
//                                         </p>
//                                     ))}
//                                 </div>
//                                 <div
//                                     className="build-dialog-answer-block"
//                                     key={'key' + index}
//                                 >
//                                     {answer[index]?.map((item, ind) => (
//                                         <p
//                                             key={'inner_ans' + ind}
//                                             className="build-dialog-answer"
//                                             onClick={() => {
//                                                 handleWordBack(ind, index);
//                                             }}
//                                         >
//                                             {item}
//                                         </p>
//                                     ))}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//             <Button
//                 className="hw__send-btn"
//                 onClick={() =>
//                     handleAnswer(obj, caseInfo.tasks?.[task_id - 1].id)
//                 }
//             >
//                 send
//             </Button>
//         </div>
//     );
// };

// export default BuildDialog;

import { useState } from 'react';
import { useEffect } from 'react';

import './tasksType.css';
import { Button } from '@mui/material';

const styles = {
    word: {
        bgcolor: '#e7e7e7',
        padding: '2px 10px',
        margin: '5px',
        borderRadius: '10px',
        transition: '100ms',
        cursor: 'pointer',
        '&:hover': {
            bgcolor: '#9bd0cb',
        },
    },
};

const BuildDialog = ({
    handleCaseDetail,
    id,
    task_id,
    caseDetail,
    handleAnswer,
    caseInfo,
}) => {
    const [sentences, setSentences] = useState([]);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        setSentences(caseDetail?.description.trim().split('|'));
    }, []);

    const handleSentence = (ind) => {
        const newSentences = [...sentences];
        const pickedSentence = newSentences.splice(ind, 1)[0];

        setSentences(newSentences);
        setAnswer((answer) => [...answer, pickedSentence]);
    };

    const handleSentenceBack = (ind) => {
        const newSentences = [...sentences];
        newSentences.splice(ind, 0, answer[ind]);
        const newAns = [...answer];
        newAns.splice(ind, 1);
        setSentences(newSentences);
        setAnswer(newAns);
    };

    return (
        <div className="sentence-container task-types-container">
            <div className="sentence-task-box-wrapper">
                <div className="sentence-task-box">
                    <div className="sentence-word build-dialog-word">
                        {sentences.map((word, ind) => (
                            <span
                                key={ind}
                                sx={styles.word}
                                onClick={() => {
                                    handleSentence(ind);
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                    <div
                        className="build-dialog-answer-block"
                        sx={styles.answer_block}
                    >
                        {answer?.map((item, ind) => (
                            <p
                                className="build-dialog-answer"
                                key={ind}
                                onClick={() => {
                                    handleSentenceBack(ind);
                                }}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <Button
                className="hw__send-btn"
                onClick={() =>
                    handleAnswer(
                        { answers: answer },
                        caseInfo.tasks?.[task_id - 1].id
                    )
                }
            >
                send
            </Button>
        </div>
    );
};

export default BuildDialog;
