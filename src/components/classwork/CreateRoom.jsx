import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import { useSchedule } from "../../contexts/ScheduleContextProvider";
import { useUsers } from "../../contexts/UsersContextProvider";

// const inpStyle = {
//   padding: "10px",
//   border: "1px solid #9bd0cb",
//   borderRadius: "5px",
//   "&:focus": {
//     outline: "1px solid #006d77",
//     border: "none",
//   },
// };

const CreateRoom = () => {
  const [roomInfo, setRoomInfo] = useState({
    name: "",
    student: "",
    lesson_id: 0,
  });
  const { getSchedule } = useSchedule();
  const { getLesson, lesson, createRoom, createRoomError, clearErrors } =
    useClassWork();
  const { getStudents, students } = useUsers();
  // console.log(students);

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom(roomInfo);
  };

  useEffect(() => {
    getSchedule();
    getStudents();
    clearErrors();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setRoomInfo({
      ...roomInfo,
      lesson_id: lesson[0]?.id,
      student: lesson[0]?.user.email,
    });
    // eslint-disable-next-line
  }, [lesson]);

  // const handleSelectChanges = (e) => {
  //   getLesson(e.target.value);
  //   setRoomInfo({ ...roomInfo, student: e.target.value });
  // };

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
          onChange={(e) => getLesson(e.target.value)}
          placeholder="student"
        >
          <option value={0}></option>
          {students?.map((student, key) => (
            <option key={key} value={student.id}>
              {student.email}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "10px",
            border: "1px solid #9bd0cb",
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
