import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import { useSchedule } from "../../contexts/ScheduleContextProvider";
import { useUsers } from "../../contexts/UsersContextProvider";

const CreateRoom = () => {
  const [roomInfo, setRoomInfo] = useState({
    name: "",
    student: "",
    lesson_id: 0,
  });
  const { getSchedule, schedule } = useSchedule();
  const { getLesson, lesson, createRoom, createRoomError, clearErrors } =
    useClassWork();
  console.log(lesson);
  const { getStudents, studentsList } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom(roomInfo);
  };

  useEffect(() => {
    getSchedule();
    getStudents();
    clearErrors();
  }, []);

  console.log(createRoomError);

  console.log(lesson);

  useEffect(() => {
    setRoomInfo({
      ...roomInfo,
      lesson_id: lesson[0]?.id,
      student: lesson[0]?.user.email,
    });
  }, [lesson]);

  console.log(roomInfo);

  const handleSelectChanges = (e) => {
    getLesson(e.target.value);
    setRoomInfo({ ...roomInfo, student: e.target.value });
  };

  return (
    <Box>
      <Typography component={"h3"} sx={{ mb: 2 }}>
        Lesson
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          style={{
            padding: "10px",
            border: "1px solid #006D77",
            borderRadius: "5px",
          }}
          type="text"
          placeholder="name"
          onChange={(e) => setRoomInfo({ ...roomInfo, name: e.target.value })}
        />
        <select
          style={{
            padding: "10px",
            border: "1px solid #006D77",
            borderRadius: "5px",
          }}
          onChange={handleSelectChanges}
        >
          <option value={0}></option>
          {studentsList?.map((student, key) => (
            <option key={key} value={student.id}>
              {student.email}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "10px",
            border: "1px solid #006D77",
            borderRadius: "5px",
            backgroundColor: "white",
            cursor: "pointer",
            color: "#006D77",
          }}
          type="submit"
        >
          create
        </button>
      </form>
      {createRoomError.title ? (
        <>
          <p style={{ color: "red", margin: "10px 0" }}>
            {createRoomError.title}
          </p>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default CreateRoom;
