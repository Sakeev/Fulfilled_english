import React from 'react';
import ScheduleTeachers from '../../components/teachers/ScheduleTeachers';
import Sidebar from "../../components/Sidebar"

const container = {
  width: '100%',
  display: 'flex'
}


const SchedulePage = () => {
  return (
    <div style={container}>
      <Sidebar />
      <ScheduleTeachers />
    </div>
  );
};

export default SchedulePage;