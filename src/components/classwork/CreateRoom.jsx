import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useClassWork } from '../../contexts/ClassWorkContextProvider';
import { useSchedule } from '../../contexts/ScheduleContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

const inpStyle = {
  padding: '10px',
  border: '1px solid #9bd0cb',
  borderRadius: '5px',
  "&:focus": {
    outline: '1px solid #006d77',
    border: 'none',
  }
}

const CreateRoom = () => {
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    lesson_id: 0,
  });
  const { getSchedule, schedule } = useSchedule();
  const { getLesson, lesson, createRoom, createRoomError, clearErrors } = useClassWork();
  const { getStudents, studentsList } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom(roomInfo);
  }

  useEffect(() => {
    getSchedule();
    getStudents();
    clearErrors();
  }, [])

  console.log(createRoomError)

  console.log(lesson)

  useEffect(() => {
    setRoomInfo({...roomInfo, lesson_id: lesson[0]?.id})
  }, [lesson])

  console.log(roomInfo)

  return (
    <Box>
      <Typography component={'h3'} sx={{mb: 2}}>Lesson</Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }} action="" onSubmit={(e) => handleSubmit(e)}>
        <input style={inpStyle} type="text" placeholder='name' onChange={(e) => setRoomInfo({...roomInfo, name: e.target.value})} />
        <select style={inpStyle} onChange={(e) => getLesson(e.target.value)}>
          <option value={0}></option>
          {
            studentsList?.map((student, key) => (
              <option key={key} value={student.id}>{student.email}</option>
            ))
          }
        </select>
        <button style={{ padding: '10px', border: '1px solid #9bd0cb', borderRadius: '5px', backgroundColor: 'white', cursor: "pointer", color: '#006D77' }} type='submit'>create</button>
      </form>
      {
        createRoomError.title ? 
        <>
          <p style={{ color: 'red', margin: '10px 0' }}>{createRoomError.title}</p>
        </>
        :
        <></>
      }
    </Box>
  );
};

export default CreateRoom;