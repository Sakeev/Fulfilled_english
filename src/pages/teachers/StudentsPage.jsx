import React from 'react';
import StudentsList from '../../components/teachers/StudentsList';
import Sidebar from "../../components/Sidebar"

const container = {
  width: '100%',
  display: 'flex'
}

const StudentsListPage = () => {
  return (
    <div style={container}>
      <Sidebar />
      <StudentsList />
    </div>
  );
};

export default StudentsListPage;