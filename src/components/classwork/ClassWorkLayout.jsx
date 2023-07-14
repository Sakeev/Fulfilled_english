import React, { useCallback, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { isTeacher } from "../../helpers/funcs";
import { Button, Link } from "@mui/material";
import ClassTasks from "./ClassTasks";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import MarkCW from "./MarkCW";
import Vocabulary from "./tasks/Vocabulary";

const request_id = new Date().getTime();

function isDocumentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "contentchange";
}
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
  const [playing, setPlaying] = useState({
    unit1: { id: 0, task: { is_playing: false } },
    unit2: { id: 0, task: { is_playing: false } },
  });
  const [current_time, set_current_time] = useState({
    unit1: { id: 0, task: { seeked: 0 } },
    unit2: { id: 0, task: { seeked: 0 } },
  });
  const [tablePlaying, setTablePlaying] = useState({
    unit1: { id: 0, task: { is_playing: false } },
    unit2: { id: 0, task: { is_playing: false } },
  });
  const [table_current_time, set_table_current_time] = useState({
    unit1: { id: 0, task: { seeked: 0 } },
    unit2: { id: 0, task: { seeked: 0 } },
  });

  const [fillinpsPlaying, setFillinpsPlaying] = useState({
    unit1: { id: 0, task: { is_playing: false } },
    unit2: { id: 0, task: { is_playing: false } },
  });
  const [fillinps_current_time, set_fillinps_current_time] = useState({
    unit1: { id: 0, task: { seeked: 0 } },
    unit2: { id: 0, task: { seeked: 0 } },
  });
  const [note_id, setNote] = useState(0);
  const [userId, setUserId] = useState(0);
  const [grade, setGrade] = useState({});
  const [vocabulary, setVocabulary] = useState([]);
  const [showVocab, setShowVocab] = useState(false);
  const [zoomLink, setZoomLink] = useState("#");

  const tasks = useCallback(
    (data) => {
      if (data.case_tasks) {
        setLesson(data);
        setVocabulary(
          data.case_tasks.unit1
            .concat(data.case_tasks.unit2)
            .filter(({ title }) => title === "vocabulary")
        );
      }
    },
    [lesson]
  );

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
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
          setZoomLink(data.data.host.zoom_link);
          setNote(data.data.lesson.notes?.id);
          tasks(data.data.lesson);
          setUserId(data.data.student.id);
          break;
        case "create":
          setInps({ ...data.data.body });
          break;
        case "get_listening":
          setPlaying({
            ...playing,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
          break;
        case "get_current_time":
          set_current_time({
            ...playing,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
          break;
        case "get_listening_te":
          setTablePlaying({
            ...tablePlaying,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
          break;
        case "get_current_time_te":
          set_table_current_time({
            ...table_current_time,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
          break;
        case "get_listening_fl":
          setFillinpsPlaying({
            ...fillinpsPlaying,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
          break;
        case "get_current_time_fl":
          set_fillinps_current_time({
            ...fillinps_current_time,
            ["unit" + data?.listening.unit]: {
              task: data?.listening.tasks[0],
              id: data?.listening.id,
            },
          });
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
      500
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
    const obj = {
      grade: e.target.value,
      user: userId,
      lesson: lesson.id,
    };
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
          <Link href={zoomLink} target="_blank" underline="none">
            <Button color="warning">Zoom link</Button>
          </Link>
        </div>
        <span>The WebSocket is currently {connectionStatus}</span>

        <EditorProvider>
          <Editor
            containerProps={{
              style: {
                height: "40vh",
                maxHeight: "500px",
                width: "100%",
              },
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
                <Button
                  sx={{ width: "29%" }}
                  onClick={sendNote}
                  color="success"
                >
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Vocabulary
          showVocab={showVocab}
          setShowVocab={setShowVocab}
          vocabTasks={vocabulary}
        />
        <ClassTasks
          request_id={request_id}
          lesson={lesson}
          playing={playing}
          sendJsonMessage={sendJsonMessage}
          inps={inps}
          setInps={setInps}
          setTyping={setTyping}
          current_time={current_time}
          tablePlaying={tablePlaying}
          table_current_time={table_current_time}
          fillinpsPlaying={fillinpsPlaying}
          fillinps_current_time={fillinps_current_time}
          setShowVocab={setShowVocab}
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
