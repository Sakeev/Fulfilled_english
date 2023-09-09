import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Progress = () => {
    const navigate = useNavigate();
    const { caseId, taskId } = useParams();

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
                onClick={() =>
                    navigate(`/task/case/${caseId}/task/${+taskId - 1}`)
                }
            >
                {' '}
                <img
                    src="/images/arrow.png"
                    alt=""
                    style={{ width: '5%', transform: 'rotate(180deg)' }}
                />
            </button>
            <button
                onClick={() =>
                    navigate(`/task/case/${caseId}/task/${+taskId + 1}`)
                }
            >
                <img src="/images/arrow.png" alt="" style={{ width: '5%' }} />
            </button>
        </div>
    );
};

export default Progress;
