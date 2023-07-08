import { Button } from '@mui/material';
import BuildSentence from './BuildSentence';
import { useEffect, useState } from 'react';

const BuildSentences = ({
    handleCaseDetail,
    id,
    task_id,
    caseDetail,
    handleAnswer,
    caseInfo,
}) => {
    const [results, setResults] = useState({});

    useEffect(() => {
        handleCaseDetail(id, task_id);
    }, []);

    const formResults = () => {
        return Object.values(results).map((result) => result.join(' '));
    };

    return (
        <div className="build-sentences-container">
            {caseDetail?.description.map((sentence, index) => {
                return (
                    <BuildSentence
                        key={index}
                        id={index}
                        task_id={task_id}
                        sentence={sentence}
                        setResults={setResults}
                    />
                );
            })}
            <Button
                className="hw__send-btn"
                onClick={() => {
                    handleAnswer(
                        { answers: formResults() },
                        caseInfo.tasks?.[task_id - 1].id
                    );
                }}
            >
                send
            </Button>
        </div>
    );
};

export default BuildSentences;
