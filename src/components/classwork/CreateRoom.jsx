import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useClassWork } from '../../contexts/ClassWorkContextProvider';
import { useSchedule } from '../../contexts/ScheduleContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const CreateRoom = () => {
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    lesson_id: 0,
  });
  const { getSchedule, schedule } = useSchedule();
  const { getLesson, lesson, createRoom } = useClassWork();
  const { getStudents, studentsList } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom(roomInfo);
  }

  useEffect(() => {
    getSchedule();
    getStudents();
  }, [])

  console.log(lesson)

  useEffect(() => {
    setRoomInfo({...roomInfo, lesson_id: lesson[0]?.id})
  }, [lesson])

  console.log(roomInfo)

  return (
    <Box>
      <Typography component={'h3'}>Lesson</Typography>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder='name' onChange={(e) => setRoomInfo({...roomInfo, name: e.target.value})} />
        <select onChange={(e) => getLesson(e.target.value)}>
          <option value={0}></option>
          {
            studentsList?.map((student, key) => (
              <option key={key} value={student.id}>{student.email}</option>
            ))
          }
        </select>
        <button type='submit'>create</button>
      </form>
    </Box>
  );
};

export default CreateRoom;