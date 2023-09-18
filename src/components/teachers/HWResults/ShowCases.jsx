import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../../contexts/TasksContextProvider';

const mainBox = {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 0',
};

const casesBox = {
    width: '40%',
    maxWidth: '300px',
    height: '7vh',
    minHeight: '50px',
    backgroundColor: '#C5E5E2',
    color: '#006D77',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1% 2% 1% 0',
    cursor: 'pointer',
    transition: '150ms',
    fontWeight: '600',
    '&:hover': {
        backgroundColor: '#9bd0cb',
    },
};
const casesMainBox = {
    width: '100%',
    height: '100%',
    marginTop: '20px',
};

const ShowCases = () => {
    const { getCases, cases } = useTasks();
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCases(userId);
    }, []);

    console.log(userId, cases);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={mainBox}>
                <h1 style={{ color: '#006D77' }}>Cases</h1>
                <Box style={casesMainBox}>
                    {cases[0]?.case_tasks?.map((e, key) => {
                        if (e.title === 'vocabulary') return null;

                        return (
                            <Box
                                key={e.id}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Box
                                    sx={casesBox}
                                    onClick={() =>
                                        navigate(
                                            `/student-tasks/${userId}/results/${e.id}`
                                        )
                                    }
                                >
                                    {e.title.charAt(0).toUpperCase() +
                                        e.title.slice(1)}{' '}
                                </Box>
                                {e.passed_quantity === e.quantity_task ? (
                                    <p style={{ color: '#006D77' }}>
                                        {e?.passed_quantity}/{e.quantity_task}
                                    </p>
                                ) : (
                                    <p style={{ color: '#E29578' }}>
                                        {e?.passed_quantity}/{e.quantity_task}
                                    </p>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </div>
    );
};

export default ShowCases;
