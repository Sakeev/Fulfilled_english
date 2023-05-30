import React, { useCallback, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { isTeacher } from "../../helpers/funcs";
import { Button } from "@mui/material";
import ClassTasks from "./ClassTasks";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import { Box } from "@mui/system";

const request_id = new Date().getTime();

function isDocumentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "contentchange";
}
// const room_pk = 1;
const ClassWorkLayout = () => {
  const { room_pk, postNote, sendMark } = useClassWork();
  const [socketUrl, setSocketUrl] = useState(
    `ws://13.50.235.4/ws/chat/?token=${
      JSON.parse(localStorage.getItem("token")).access
    }`
  );
  const [lesson, setLesson] = useState({});
  const [inps, setInps] = useState({ chat: "" });
  const [typing, setTyping] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [note_id, setNote] = useState(0);
  const [userId, setUserId] = useState(0);
  const [grade, setGrade] = useState({});
  const tasks = useCallback(
    (data) => {
      setLesson(data);
    },
    [lesson]
  );
  console.log(lesson);

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
        const joinRoom = {
          pk: room_pk,
          action: "join_room",
          request_id: request_id,
        };
        sendJsonMessage(joinRoom);
        const retrieveMessage = {
          pk: room_pk,
          action: "retrieve",
          request_id: request_id,
        };
        sendJsonMessage(retrieveMessage);
        const subscribeMessage = {
          pk: room_pk,
          action: "subscribe_to_messages_in_room",
          request_id: request_id,
        };
        sendJsonMessage(subscribeMessage);
        const subscribeInstanceMessage = {
          pk: room_pk,
          action: "subscribe_instance",
          request_id: request_id,
        };
        sendJsonMessage(subscribeInstanceMessage);
        const subscribeLessonActivity = {
          action: "subscribe_lesson_activity",
          request_id: request_id,
        };
        sendJsonMessage(subscribeLessonActivity);
        const getLessonInRoom = {
          pk: 1,
          action: "get_lesson",
          room_pk: room_pk,
          request_id: request_id,
        };
        sendJsonMessage(getLessonInRoom);
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.action) {
          case "retrieve":
            console.warn(data.data.messages);
            setNote(data.data.lesson.notes.id);
            tasks(data.data.lesson);
            setUserId(
              data.data.current_users.find((user) => !user.isTeacher).id
            );
            console.log(data.data);

            break;
          case "create":
            // if (!isTeacher()) {
            setInps({ ...data.data.body });
            // }
            console.log(data.action, data.data.body);
            break;
          default:
            break;
        }
      },
      share: true,
      filter: isDocumentEvent,
      retryOnError: false,
      onClose: (e) => console.log(e),
      shouldReconnect: () => false,
    }
  );
  useEffect(() => {
    sendJsonMessage({
      playing: playing,
      action: "audio_play",
      request_id: request_id,
    });
  }, [playing]);

  useEffect(() => {
    const timeOut = setTimeout(
      () =>
        sendJsonMessage({
          message: inps,
          action: "create_message",
          request_id: request_id,
        }),
      300
    );
    return () => clearTimeout(timeOut);
  }, [typing]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  function handleHtmlChange(e) {
    console.log(e);
    setInps({ ...inps, chat: e.target.value });
    setTyping((prev) => !prev);
  }

  function sendNote() {
    let obj = Object.assign({
      body: inps.chat,
    });

    postNote(obj, note_id);
  }

  function handleMark(e) {
    setGrade({
      grade: e.target.value,
      user: userId,
      lesson: lesson.id,
    });
  }

  return (
    <div
      style={{
        width: "80%",
        height: "95vh",
        margin: "40px 0 0 30px",
        display: "flex",
      }}
    >
      <div style={{ width: "40%", height: "100%", minWidth: "300px" }}>
        <div
          style={{
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button color="warning">Zoom link</Button>
        </div>
        <span>The WebSocket is currently {connectionStatus}</span>

        <EditorProvider>
          <Editor
            containerProps={{
              style: { height: "40vh", maxHeight: "500px", width: "100%" },
            }}
            value={inps.chat}
            onChange={handleHtmlChange}
            disabled={!isTeacher()}
          >
            {isTeacher() ? (
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
                <Button onClick={sendNote} color="success">
                  Send Note
                </Button>
              </Toolbar>
            ) : (
              <></>
            )}
          </Editor>
        </EditorProvider>
      </div>
      <div
        style={{
          margin: "0 30px",
          width: "70%",
          display: "flex",
          // flexDirection: "column",
          // alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <ClassTasks
          lesson={lesson}
          playing={playing}
          setPlaying={setPlaying}
          sendJsonMessage={sendJsonMessage}
          inps={inps}
          setInps={setInps}
          setTyping={setTyping}
        />
        {isTeacher() ? (
          <Box
            sx={{
              width: "175px",
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              style={{ width: "50px", paddingLeft: "10px" }}
              placeholder="  / 10"
              onChange={handleMark}
            />
            <Button
              color="success"
              sx={{ width: "100px" }}
              onClick={() => sendMark(grade)}
            >
              mark
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ClassWorkLayout;
