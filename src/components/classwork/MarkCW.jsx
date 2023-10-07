import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const MarkCW = ({ checkMark, handleMark, grade }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { deleteRoom, room_pk } = useClassWork();

  return (
    <>
      <Box
        sx={{
          width: "175px",
          height: "30px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          position: "absolute",
          right: "5%",
        }}
      >
        <input
          type="number"
          style={{ width: "50px", paddingLeft: "10px" }}
          placeholder="  / 10"
          min="1"
          max="10"
          onChange={handleMark}
          className="no-arrows"
        />
        <Button
          color="warning"
          variant="contained"
          sx={{ width: "100px" }}
          onClick={() => {
            checkMark(grade, handleOpen);
          }}
        >
          mark
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Завершить занятие?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              color="success"
              onClick={() => deleteRoom(room_pk, handleClose)}
            >
              Завершить
            </Button>
            <Button color="error" onClick={handleClose}>
              Отмена
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MarkCW;
