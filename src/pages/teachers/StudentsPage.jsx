import StudentsList from '../../components/teachers/StudentsList/StudentsList';
import React from 'react';

const container = {
    width: '100%',
    display: 'flex',
};

const StudentsListPage = () => (
    <div style={container}>
        <StudentsList />
    </div>
);

export default StudentsListPage;
