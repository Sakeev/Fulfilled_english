import { Button, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useState, Fragment } from 'react';

import './tasksType.css';

const createInitAnswer = (dropdowns) => {
    return dropdowns.reduce((answer, _, index) => {
        answer[index] = 'choose word';
        return answer;
    }, {});
};

const Dropdown = ({
    caseDetail,
    caseDetail: { description, dropdowns },
    handleAnswer,
    task_id,
    caseInfo,
}) => {
    const [studentAnswer, setStudentAnswer] = useState(
        createInitAnswer(dropdowns)
    );
    const splittedDesc = description.split('__drop__');

    useEffect(() => {
        setStudentAnswer(createInitAnswer(dropdowns));
    }, [dropdowns]);

    const chooseWord = (event, index) => {
        setStudentAnswer((prev) => {
            return { ...prev, [index]: event.target.value };
        });
    };

    const getStudentAnswer = () => {
        const splittedAnswer = splittedDesc.map((sentencePart, index) => {
            if (index + 1 === splittedDesc.length) return sentencePart;
            return sentencePart + studentAnswer[index];
        });

        return splittedAnswer.join('');
    };

    const dropdownArr = splittedDesc.map((sentencePart, index) => {
        return (
            <Fragment key={index}>
                {sentencePart}
                {index + 1 !== splittedDesc.length ? (
                    <Select
                        variant="filled"
                        value={studentAnswer[index]}
                        onChange={(event) => chooseWord(event, index)}
                    >
                        <MenuItem hidden disabled value={'choose word'}>
                            choose word
                        </MenuItem>
                        {dropdowns[index].map((options, index) => (
                            <MenuItem key={index} value={options}>
                                {options}
                            </MenuItem>
                        ))}
                    </Select>
                ) : null}
            </Fragment>
        );
    });

    return (
        <>
            <p className="task-condition">
                {caseInfo.tasks?.[task_id - 1].condition}
            </p>
            <div className="dropdown-container task-types-container">
                <div className="dropdown">
                    <div>{dropdownArr}</div>
                </div>
                <Button
                    onClick={() =>
                        handleAnswer(
                            { answers: getStudentAnswer() },
                            caseInfo.tasks?.[task_id - 1].id
                        )
                    }
                >
                    send
                </Button>
            </div>
        </>
    );
};

export default Dropdown;
