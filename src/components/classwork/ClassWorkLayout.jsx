import React, { useCallback, useEffect, useState } from 'react';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, DefaultEditor, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { ReadyState } from 'react-use-websocket';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { isTeacher } from '../../helpers/funcs';
import { Button } from '@mui/material';
import ClassTasks from './ClassTasks';

const room_pk = 10;
const request_id = new Date().getTime();

function isDocumentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
}

const ClassWorkLayout = () => {
  const [socketUrl, setSocketUrl] = useState(`ws://35.239.173.63/ws/chat/?token=${JSON.parse(localStorage.getItem('token')).access}`);
  const [lesson, setLesson] = useState({})
  const [html, setHtml] = useState('');
  const [playing, setPlaying] = useState(false);

  const tasks = useCallback((data) => {
    setLesson(data);
  }, [lesson])

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(socketUrl , {
    onOpen: () => {
      console.log('WebSocket connection established.');
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
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
        switch (data.action) {
          case 'retrieve':
            console.log(data.data);
            tasks(data.data.lesson)
            break;
          case 'create':
            if(!isTeacher()){
              setHtml(data.data.text)
            }
            console.log(data.action, data.data);
            break;
          default:
            break;
        }
    },
    share: true,
    filter: isDocumentEvent,
    retryOnError: false,
    onClose: (e) => console.log(e),
    shouldReconnect: () => false
  });

  useEffect(() => {
    console.log(123)
    sendJsonMessage({
      playing: playing,
      action: "audio_play",
      request_id: request_id,
    })
  }, [playing])


  useEffect(() => {
    const timeOut = setTimeout(() => sendJsonMessage({
      message: html,
      action: "create_message",
      request_id: request_id,
    }), 500);
    return () => clearTimeout(timeOut);
  }, [html])
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  function handleHtmlChange(e) {
    setHtml(e.target.value);;
  }

  return (
    <div style={{ width: '80%', height: '95vh', margin: '40px 0 0 30px', display: 'flex' }}>
      <div style={{ width: '40%', height: '100%', minWidth: '300px' }}>
        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="warning">Zoom link</Button>
        </div>
        <span>The WebSocket is currently {connectionStatus}</span>

        <EditorProvider>
          <Editor containerProps={{ style: { height: '40vh', maxHeight: '500px', width: '100%' } }} value={html} onChange={handleHtmlChange} disabled={!isTeacher()}>
            {
              isTeacher() ?
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
            </Toolbar>
            :
            <></>
            }
          </Editor>
        </EditorProvider>
      </div>
      <div style={{ margin: '0 30px' }}>
        <ClassTasks lesson={lesson} playing={playing} setPlaying={setPlaying} />
      </div>
    </div>
  );
};

export default ClassWorkLayout;