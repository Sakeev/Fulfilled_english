import React, { useCallback, useEffect, useState } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { ReadyState } from 'react-use-websocket';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

const room_pk = 1;
const request_id = new Date().getTime();

function isUserEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'userevent';
}

function isDocumentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
}


const ClassWorkLayout = () => {
  const [socketUrl, setSocketUrl] = useState(`ws://35.239.173.63/ws/chat/?token=${JSON.parse(localStorage.getItem('token')).access}`);
  console.log(request_id);
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
        // console.log(data);
        // console.log('RealTime', data.data);
        switch (data.action) {
          case 'retrieve':
            console.log(data.data);
            break;
          case 'create':
            console.log(data.action, data.data);
            break;
          default:
            break;
        }
    },
    share: true,
    filter: () => false,
    retryOnError: false,
    onClose: (e) => console.log(e),
    shouldReconnect: () => false
  });

  const [html, setHtml] = useState(lastJsonMessage?.data.editorContent || '');
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  function handleHtmlChange(e) {
    setHtml(e.target.value);
    sendJsonMessage({
      message: e.target.value,
      action: "create_message",
      request_id: request_id,
    });
  }

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      

      <DefaultEditor value={html} onChange={handleHtmlChange} />
    </div>
  );
};

export default ClassWorkLayout;