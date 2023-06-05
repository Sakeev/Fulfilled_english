import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useUsers } from "../../contexts/UsersContextProvider";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const btnStyle = {
  margin: "10px 5px",
  width: "100px",
  backgroundColor: "#C5E5E2",
  color: "#006D77",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#9bd0cb",
  },
};
const selectContainer = {
  margin: '10px 0',
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: '5px 0',
  borderRadius: '5px'
};
const modalContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const HomeWork = () => {
  const {
    getUsers,
    hwstudents,
    getUserHw,
    studentshw,
    getOneHw,
    onehw,
    onelesson,
    getOneLesson,
    getCurrentLesson,
    currentlesson,
  } = useUsers();
  const navigate = useNavigate();
  const [index, setIndex] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [lesson, setLesson] = React.useState("1");

  const [lessonValue, setLessonValue] = useState(" ");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uniqLesson, setUniqLesson] = useState(onelesson?.case_tasks);
  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const selectedLessonId = e.target.value;
    setLessonValue(selectedLessonId, () => {
      getOneLesson(selectedLessonId, index);
    });
    getCurrentLesson(index);
  };

  console.log(lessonValue);

  useEffect(() => {
    setUniqLesson(onelesson?.case_tasks);
  }, [onelesson]);

  useEffect(() => {
    if (index !== null) {
      getOneLesson(lessonValue, index);
    }
  }, [lessonValue, index]);

  useEffect(() => {
    if (index !== null) {
      getCurrentLesson(index);
    }
  }, [index]);
  const [currUser, setCurrUser] = useState(null);
  // console.log(currUser);
  const highFunc = (id) => {
    handleOpen();
    getUserHw(id);
    setIndex(id);
    getUserHw(id);
    setCurrUser(id);
  };

  useEffect(() => {
    setLessonValue(studentshw?.length);
  }, [studentshw]);

  // console.log(studentshw);

  useEffect(() => {
    if (currentlesson.length > 0 && lessonValue == " ") {
      setLessonValue(currentlesson[0]?.id);
    }
  }, [currentlesson]);
  console.log(currentlesson);

  return (
    <div className="essay-container">
      <div className="essay-headers">
        <h2>Students list</h2>
      </div>
      <div className="essay-columns">
        <p>Email:</p>
      </div>
      <ul className="essay-students-list">
        {hwstudents.map((student, key) => (
          <li className="essay-student" key={key}>
            <div
              className="essay-student-info"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{student.user?.email}</p>
              <div className="essay-icon"></div>
            </div>
            <Modal
              sx={modalContainer}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Home works
                </Typography>
                <div id="modal-modal-description" sx={{ mt: 2 }}>
                  {studentshw.length > 0 && (
                    <>
                      <label style={{ marginTop: "5%" }}>
                        Choose a lesson:
                      </label>
                      <select
                        id="lesson"
                        name="lessons"
                        onChange={handleChange}
                        value={lessonValue}
                        style={selectContainer}
                      >
                        {studentshw.map((elem, key) => {
                          return (
                            <option key={key} value={elem.id}>
                              {elem.title}
                            </option>
                          );
                        })}
                      </select>
                      <div>
                        <ol style={{ listStyle: 'none' }}>
                          {onelesson &&
                            onelesson.case_tasks?.map((item, key) => {
                              return (
                                <Typography
                                  sx={{ cursor: 'pointer', transition: '100ms', color: '#006D77', fontWeight: '600' , '&:hover': { color: '#e29578' } }}
                                  key={key}
                                  onClick={() => {
                                    navigate(`/hwresults/${item.id}/${index}`);
                                  }}
                                >
                                  <li style={{ margin: "5% 0" }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</li>
                                </Typography>
                              );
                            })}
                        </ol>
                      </div>
                    </>
                  )}
                </div>
                {studentshw.length === 0 && (
                  <>
                    <Typography>There are no lessons</Typography>
                  </>
                )}
              </Box>
            </Modal>
            <Button
              sx={btnStyle}
              onClick={() => {
                highFunc(student.user?.id);
              }}
            >
              view h/w
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeWork;
