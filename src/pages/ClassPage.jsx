import React, { useEffect, useRef, useState } from 'react';

const ClassPage = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const room_pk = 1;
  const request_id = Date.now();
  useEffect(() => {}, []);

  const sendMessage = () => {
    // const message = {
    //   message: `my message`,
    //   action: 'create',
    //   request_id: request_id,
    //   pk: 8,
    // };
    socket.current.send(JSON.stringify({
        message: value,
        action: "create_message",
        request_id: request_id,
        pk: 8,
    }));

    setValue('');
  };

  const connect = () => {
    const token = (localStorage.getItem('Token'));
    // const access = token.access;
    // console.log(access);
    socket.current = new WebSocket(
      `ws://35.239.173.63/ws/chat/?token=${token}`
    );
    socket.current.onopen = function () {
        const joinMessage = {
            pk: 1,
            action: "join_room",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(joinMessage));
        const retrieveMessage = {
            pk: 1,
            action: "retrieve",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(retrieveMessage));
        const subscribeMessage = {
            pk: 1,
            action: "subscribe_to_messages_in_room",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(subscribeMessage));
        const subscribeInstanceMessage = {
            pk: 1,
            action: "subscribe_instance",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(subscribeInstanceMessage));
        setConnected(true);
    };
  };

  useEffect(() => {
    if (connected) {
        socket.current.onmessage = function (e) {
          const data = JSON.parse(e.data);
          console.log(data);
          console.log('RealTime', data.data);
          switch (data.action) {
            case 'retrieve':
              console.log(data.data);
              setUsername(data.data.host.username);
              setMessages(data.data.messages);
              break;
            case 'create':
              console.log(data.action, data.data);
              setMessages((messages) => [...messages, data.data]);
              break;
            default:
              break;
          }
        };

        socket.current.onclose = () => {
          console.log('WebSocket is closed');
        };
        socket.current.onerror = () => {
          console.log('WebSocket error');
        };
    }
  }, [connected]);


  if (!connected) {
    return (
      <>
        <input
          type="text"
          placeholder="type ur name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={connect}>connect</button>
      </>
    );
  }
  return (
    <div>
      <div id="username">{username} connected</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
      {messages.map((mess) => {
        console.log(mess);
        return (
          <div key={mess.id}>
            {mess.event === 'connection' ? (
              <div>{mess.text} connected</div>
            ) : (
              <div>
                {mess.username}. {mess.text}{' '}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ClassPage;
