import StudentsList from '../../components/teachers/StudentsList/StudentsList';
import Sidebar from '../../components/Sidebar';
import React from 'react';

const container = {
    width: '100%',
    display: 'flex',
};

const StudentsListPage = () => (
    <div style={container}>
        <Sidebar />
        <StudentsList />
    </div>
);

export default StudentsListPage;
