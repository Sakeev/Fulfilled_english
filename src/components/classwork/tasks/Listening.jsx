import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { API } from "../../../helpers/consts";
import Audio from "./Audio";

const Listening = ({
  task = [],
  playing,
  sendJsonMessage,
  request_id,
  listeningId,
  taskId,
  current_time,
}) => {
  return (
    <>
      <h2>Listening</h2>
      <div className="listening-box">
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: "0" }}
          >
            <h4 style={{ color: "#ef9042", margin: "10px 0 6px" }}>
              Audio player
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <Audio
              audioSource={API + task[0]?.audio}
              playing={playing}
              sendJsonMessage={sendJsonMessage}
              request_id={request_id}
              listeningId={listeningId}
              taskId={taskId}
              current_time={current_time}
            />
          </AccordionDetails>
        </Accordion>
        <div>
          <p className="listening-text">{task[0].condition}</p>
          {task[0].images?.map((image, index) => (
            <img
              key={index}
              src={API + image.image}
              width={image.size}
              alt=""
            />
          ))}
        </div>
        {task[0]?.description.split("\r\n").map((text, index) => (
          <p className="listening-text" key={index}>
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default Listening;
