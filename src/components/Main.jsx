import { Box, Modal, Paper, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import sticker from "../assets/images/startlesson.svg";
import avatar from "../assets/images/images.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import HomePageSchedule from "./teachers/HomePageSchedule";
import CreateRoom from "./classwork/CreateRoom";
import { isTeacher, timeFromMilliseconds, dateFormate } from "../helpers/funcs";
import { useClassWork } from "../contexts/ClassWorkContextProvider";
import api from "../http";
import { API } from "../helpers/consts";
import { useSchedule } from "../contexts/ScheduleContextProvider";
import { useUsers } from "../contexts/UsersContextProvider";
import NotFoundPage from "./NotFoundPage";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "&:focus": {
    outline: "none",
  },
};

const avatarImg = {
  maxWidth: "70px",
  width: "40%",
  borderRadius: "50%",
  objectFit: "cover",
};

const calendar = {
  width: "20px",
  height: "20px",
  mx: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "10px",
  bgcolor: "#edf6f9",
  width: "20px",
  height: "20px",
  mx: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "10px",
  bgcolor: "#edf6f9",
};

const profileStyle = {
  name: {
    fontSize: "1.3rem",
    "@media (max-width: 1100px)": {
      fontSize: "1.2rem",
    },
    "@media (max-width: 1000px)": {
      fontSize: "1.1rem",
    },
    "@media (max-width: 900px)": {
      fontSize: "1rem",
    },
  },
  description: {
    fontSize: "1.2rem",
    "@media (max-width: 1100px)": {
      fontSize: "1.1rem",
    },
    "@media (max-width: 1000px)": {
      fontSize: "1rem",
    },
    "@media (max-width: 900px)": {
      fontSize: "0.9rem",
    },
  },
};

const Main = () => {
  const { isTeacher, getRoomOrRooms } = useAuth();
  const { getRoom } = useClassWork();
  const { hwstudents, getUsers, teacherInfo, getTeacher } = useUsers();
  const [isHover, setIsHover] = useState(false);
  const [isHoverProfile, setIsHoverProfile] = useState(false);
  const [progress, setProgress] = useState({
    lessonsQuantity: null,
    passedLessons: null,
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00:00:00:00");
  const [tables, setTables] = useState([]);
  const [upcomingLesson, setUpcomingLesson] = useState(null);
  const [isNowLesson, setIsNowLesson] = useState(false);
  const isNowLessonRef = useRef();
  isNowLessonRef.current = isNowLesson;
  const [connectingLesson, setConnectingLesson] = useState(false);
  const { getSchedule, schedule } = useSchedule();
  const [miniSchedule, setMiniSchedule] = useState([
    { user: "", time: "", date: "" },
    { user: "", time: "", date: "" },
    { user: "", time: "", date: "" },
    { user: "", time: "", date: "" },
  ]);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  });

  useEffect(() => {
    getUsers();
    getTeacher();
    getSchedule();
    getRoomOrRooms()
      .then((res) => {
        setProgress({
          lessonsQuantity: res.count_lessons,
          passedLessons: res.progres_classwork,
        });
      })
      .catch((err) => console.log(err));

    getUpcomingLessons();

    // api.get('http://13.50.235.4/chat/room/').then((res) =>
    //     console.log(res)
    // );
  }, []);

  console.log(teacherInfo);

  useEffect(() => {
    // console.log(tables);
    findCurrentLesson(tables);
  }, [tables]);

  useEffect(() => {
    if (upcomingLesson) {
      const countdown = setInterval(() => {
        setTimeLeft(
          timeFromMilliseconds(
            new Date(`${upcomingLesson.date} ${upcomingLesson.time}`)
          )
        );
        const data = getActiveLessons(tables);
        if (data.length) {
          if (data[0].id !== upcomingLesson.id) {
            setUpcomingLesson(data[0]);
          }
        } else {
          setUpcomingLesson(null);
        }
        if (isNowLesson) {
          findCurrentLesson(tables);
        }
      }, 1000);

      findCurrentLesson(tables);

      return () => clearInterval(countdown);
    }
  }, [upcomingLesson]);

  useEffect(() => {
    if (schedule) {
      // setMiniSchedule(schedule.slice(0, 4));
      setMiniSchedule(
        miniSchedule.map((sch, ind) => {
          return {
            ...sch,
            user: schedule[ind]?.user,
            time: schedule[ind]?.time,
            date: schedule[ind]?.date,
          };
        })
      );
    }
  }, [schedule]);

  const getUpcomingLessons = () => {
    api.get("http://13.50.235.4/schedule/schedule/").then((res) => {
      let data = res.data;
      setTables(data);
      data.sort((a, b) => a.weekday - b.weekday);
      data = getActiveLessons(data);
      if (data.length > 0) setUpcomingLesson(data[0]);
    });
  };

  const getActiveLessons = (tables) => {
    if (tables.length) {
      const today = new Date();
      return tables.filter(
        (table) => today < new Date(`${table.date} ${table.time}`)
      );
    }
    return [];
  };

  const findCurrentLesson = (tables) => {
    for (let table of tables) {
      const lessonDate = new Date(`${table.date} ${table.time}`);
      const delayedLessonDate = new Date(`${table.date} ${table.time}`);
      delayedLessonDate.setTime(delayedLessonDate.getTime() + 60 * 60 * 1000); // 1:30
      const today = new Date();

      if (today > lessonDate && today < delayedLessonDate) {
        if (!isNowLesson) setIsNowLesson(true);
        break;
      } else {
        setIsNowLesson(false);
      }
    }
  };

  const joinLesson = async () => {
    setConnectingLesson(true);
    const chatRoom = await api.get(`${API}chat/room/`);

    if (chatRoom.data.length) {
      localStorage.setItem("room_pk", chatRoom.data[0].pk);
      navigate("/classwork");
    }
    setConnectingLesson(false);
  };

  const studentProgress = Math.round(
    (100 / progress.lessonsQuantity) * progress.passedLessons
  );

  const handleMouseEnter = (setFunc) => {
    setFunc(true);
  };

  const handleMouseLeave = (setFunc) => {
    setFunc(false);
  };

  const handleClassWork = () => {
    getRoom();
  };

  return !teacherInfo?.id ? (
    <NotFoundPage />
  ) : (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        width: "75vw",
        height: "90vh",
        padding: "0 2%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "65%" }}>
          <Paper
            elevation={isHover ? 6 : 1}
            sx={{
              m: 2,
              height: "28vh",
              cursor: "pointer",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              borderRadius: "50px 10px 10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onClick={() => {
              if (isTeacher) {
                setShowModal(true);
              } else {
                if (isNowLesson) {
                  joinLesson();
                }
              }
            }}
            onMouseEnter={() => handleMouseEnter(setIsHover)}
            onMouseLeave={() => handleMouseLeave(setIsHover)}
          >
            {!connectingLesson ? (
              <>
                <Box
                  sx={{
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {isTeacher ? null : (
                    <Typography variant="p" sx={{ color: "#83C5BE" }}>
                      {upcomingLesson
                        ? isNowLesson
                          ? "Lesson has started"
                          : `Estimated time: ${timeLeft}`
                        : "You don't have lessons this week"}
                    </Typography>
                  )}
                  <Typography variant="h5" sx={{ color: "#006D77" }}>
                    {isTeacher
                      ? "Start lesson"
                      : isNowLesson
                      ? "Join to the lesson"
                      : ""}
                  </Typography>
                </Box>
                <img
                  style={{
                    width: "20%",
                    margin: "0 0 20px 0",
                  }}
                  src={sticker}
                  alt=""
                />
              </>
            ) : (
              <div className="loader-wrapper">
                <div className="loader"></div>
              </div>
            )}
          </Paper>
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <CreateRoom />
            </Box>
          </Modal>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Paper
            elevation={isHoverProfile ? 6 : 1}
            sx={{
              m: 2,
              height: "28vh",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              borderRadius: "10px 50px 10px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
            onMouseEnter={() => handleMouseEnter(setIsHoverProfile)}
            onMouseLeave={() => handleMouseLeave(setIsHoverProfile)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: "100%",
                color: "#006d77",
              }}
            >
              {/* hwstudents contains user info ??? wtf ! need to fix */}
              {isTeacher ? (
                teacherInfo?.first_name ? (
                  <Typography variant="h6" sx={profileStyle.name}>
                    {teacherInfo?.first_name} {teacherInfo?.last_name}
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={profileStyle.name}>
                    {teacherInfo?.email}
                  </Typography>
                )
              ) : hwstudents[0]?.user?.first_name ? (
                <Typography variant="h6" sx={profileStyle.name}>
                  {hwstudents[0]?.user?.first_name}{" "}
                  {hwstudents[0]?.user?.last_name}
                </Typography>
              ) : (
                <Typography variant="h6" sx={profileStyle.name}>
                  {hwstudents[0]?.user?.email}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10%",
                }}
              >
                <img src={avatar} alt="avatar" style={avatarImg} />
                {isTeacher ? (
                  <></>
                ) : (
                  <Box>
                    <Typography sx={profileStyle.description}>
                      Balance: {hwstudents[0]?.payment}
                    </Typography>
                    <Typography sx={profileStyle.description}>
                      Level: {hwstudents[0]?.level}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {isTeacher ? (
        <Box>
          <Paper
            elevation={1}
            sx={{
              m: 2,
              height: "23vh",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "space-between",
            }}
          >
            <Typography sx={{ ml: 5 }} component={"h2"}>
              Schedule
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                margin: "0 auto",
                height: "100%",
                alignItems: "center",
              }}
            >
              {miniSchedule?.map((lesson, ind) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80%",
                    borderRadius: "10px",
                    backgroundColor: "#EDF6F9",
                    color: "#006d77",
                    transition: "200ms",
                    cursor: "pointer",
                    border: "2px solid #C5E5E2",
                    "&:hover": {
                      backgroundColor: "#C5E5E2",
                    },
                  }}
                  key={ind}
                  onClick={() => navigate("/schedule")}
                >
                  <Typography sx={{ fontSize: "0.7vw" }} component={"p"}>
                    {dateFormate(lesson.date)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1vw",
                      color: "#E29578",
                    }}
                    component={"p"}
                  >
                    {lesson.time}
                  </Typography>
                  <Typography sx={{ fontSize: "1vw" }} component={"p"}>
                    {lesson.user}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Paper
            elevation={1}
            sx={{
              m: 2,
              height: "28vh",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Typography variant="h6" sx={{ ml: 5, color: "#006d77" }}>
                Ваш прогресс
              </Typography>
              <Typography variant="h6" sx={{ color: "#006d77" }}>
                {progress.passedLessons}/{progress.lessonsQuantity}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 5,
                width: "90%",
                height: "50px",
                bgcolor: "#83C5BE",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  width: studentProgress + "%",
                  height: "100%",
                  bgcolor: "#E29578",
                  borderRadius: "10px",
                }}
              ></Box>
            </Box>
          </Paper>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "47%" }}>
          <Paper
            elevation={1}
            sx={{
              m: 2,
              height: "28vh",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              borderRadius: "10px 10px 10px 50px",
            }}
            onClick={() => navigate("/notes")}
          >
            <Typography sx={{ ml: 5, color: "#006d77" }}>Notes</Typography>
          </Paper>
        </Box>
        <Box sx={{ width: "47%" }}>
          <Paper
            elevation={1}
            sx={{
              m: 2,
              height: "28vh",
              // maxHeight: "220px",
              width: "100%",
              p: 2,
              bgcolor: "#EDF6F9",
              color: "#006D77",
              borderRadius: "10px 10px 50px 10px",
            }}
          >
            Dictionary (in development)
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
