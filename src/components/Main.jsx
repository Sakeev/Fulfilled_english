import { Box, Modal, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import sticker from "../assets/images/startlesson.svg";
import avatar from "../assets/images/images.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import HomePageSchedule from "./teachers/HomePageSchedule";
import { useEffect } from "react";
import CreateRoom from "./classwork/CreateRoom";
import { isTeacher } from "../helpers/funcs";
import { useClassWork } from "../contexts/ClassWorkContextProvider";

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
  width: "70px",
  borderRadius: "50%",
  width: "70px",
  borderRadius: "50%",
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

const Main = () => {
  const { isTeacher, getRoomOrRooms } = useAuth();
  const { getRoom } = useClassWork();
  const [isHover, setIsHover] = useState(false);
  const [isHoverProfile, setIsHoverProfile] = useState(false);
  const [progress, setProgress] = useState({
    lessonsQuantity: null,
    passedLessons: null,
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      setShowModal(false);
    }
  });

  useEffect(() => {
    getRoomOrRooms()
      .then((res) => {
        console.log(res);
        setProgress({
          lessonsQuantity: res.count_lessons,
          passedLessons: res.progres_classwork,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getRoomOrRooms()
      .then((res) => {
        console.log(res);
        setProgress({
          lessonsQuantity: res.count_lessons,
          passedLessons: res.progres_classwork,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const studentProgress = Math.round(
    (100 / progress.lessonsQuantity) * progress.passedLessons
  );

  const handleMouseOver = (setFunc) => {
    setFunc(true);
  };

  const handleMouseOut = (setFunc) => {
    setFunc(false);
  };

  const handleClassWork = () => {
    getRoom();
  };

  return (
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
          height: '100%',
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
                handleClassWork();
              }
            }}
            onMouseOver={() => handleMouseOver(setIsHover)}
            onMouseOut={() => handleMouseOut(setIsHover)}
          >
            <Box
              sx={{
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography variant="p" sx={{ color: "#83C5BE" }}>
                Estimated time: 5:43
              </Typography>
              <Typography variant="h5" sx={{ color: "#006D77" }}>
                Start lesson
              </Typography>
            </Box>
            <img
              style={{ width: "20%", margin: "0 0 20px 0" }}
              src={sticker}
              alt=""
            />
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
            onMouseOver={() => handleMouseOver(setIsHoverProfile)}
            onMouseOut={() => handleMouseOut(setIsHoverProfile)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                color: "#006d77",
              }}
            >
              <Typography variant="h6">Profile</Typography>
              <img src={avatar} alt="avatar" style={avatarImg} />
              <Typography variant="h6">Balance: 10</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {isTeacher ? null : (
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
