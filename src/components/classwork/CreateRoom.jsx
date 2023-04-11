import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useClassWork } from '../../contexts/ClassWorkContextProvider';
import { useSchedule } from '../../contexts/ScheduleContextProvider';

const CreateRoom = () => {
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    lesson_id: 0,
  });
  const { getSchedule, schedule } = useSchedule();
  const { getLessons, lesson, createRoom } = useClassWork();

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom(roomInfo);
  }

  useEffect(() => {
    getSchedule();
    getLessons();
  }, [])

  useEffect(() => {
    setRoomInfo({...roomInfo, lesson_id: lesson.id})
  }, [lesson])

  return (
    <Box>
      <Typography component={'h3'}>Lesson</Typography>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder='name' onChange={(e) => setRoomInfo({...roomInfo, name: e.target.value})} />
        {/* <select onChange={(e) => setRoomInfo({...roomInfo, lesson_id: +e.target.value})}>
          <option value={0}></option>
          {
            lessons?.map((lesson, key) => (
              <option key={key} value={lesson.id}>{lesson.title}</option>
            ))
          }
        </select> */}
        <button type='submit'>create</button>
      </form>
    </Box>
  );
};

export default CreateRoom;