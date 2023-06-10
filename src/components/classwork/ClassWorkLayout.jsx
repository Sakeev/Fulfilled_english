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
import MarkCW from "./MarkCW";

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
  const [audioId, setAudioId] = useState({});

  console.log(playing);
  const tasks = useCallback(
    (data) => {
      setLesson(data);
    },
    [lesson]
  );

  const { sendJsonMessage, readyState, lastJsonMessage, getWebSocket } =
    useWebSocket(socketUrl, {
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
        console.log(
          "data=>",
          data?.lesson?.case_tasks?.unit1[1]?.tasks[0]?.is_playing
        );
        setPlaying(data?.lesson?.case_tasks?.unit1[1]?.tasks[0]?.is_playing);
        switch (data.action) {
          case "retrieve":
            // console.warn(data.data.messages);
            setNote(data.data.lesson.notes.id);
            tasks(data.data.lesson);
            setUserId(data.data.student.id);
            console.warn(data.data);

            break;
          case "create":
            // if (!isTeacher()) {
            setInps({ ...data.data.body });
            // }
            // console.log("=>data", data);
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
    });

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

  // useEffect(() => () => localStorage.removeItem("room_pk"), []);

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
    const obj = {
      grade: e.target.value,
      user: userId,
      lesson: lesson.id,
    };
    console.log(obj);
    setGrade(obj);
  }

  function checkMark(mark, handleOpen) {
    if (!mark.grade?.trim().length) {
      prompt("Ertay gay");
      alert("Po lyubomu gay");
      return;
    }
    sendMark(mark, handleOpen);
  }

  // check
  // const handleOnMessage = (message) => {
  //   console.log("Received message:", message);
  //   // Дополнительная обработка полученного сообщения
  // };

  // useEffect(() => {
  //   if (getWebSocket) {
  //     getWebSocket().onmessage = handleOnMessage;
  //   }
  // }, [getWebSocket]);

  return (
    <div
      style={{
        width: "80%",
        height: "95vh",
        margin: "40px 0 0 30px",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "100%",
          minWidth: "300px",
        }}
      >
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
          justifyContent: "center",
        }}
      >
        <ClassTasks
          audioId={audioId}
          setAudioId={setAudioId}
          request_id={request_id}
          lesson={lesson}
          playing={playing}
          setPlaying={setPlaying}
          sendJsonMessage={sendJsonMessage}
          inps={inps}
          setInps={setInps}
          setTyping={setTyping}
        />
        {isTeacher() ? (
          <MarkCW checkMark={checkMark} handleMark={handleMark} grade={grade} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ClassWorkLayout;
