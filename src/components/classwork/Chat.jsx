import React, { useEffect, useRef, useState } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

const messagesTest = [
  {
    id: 1,
    event: '123',
    text: 'hello',
    user: {
      username: 'Admin'
    }
  },
  {
    id: 2,
    event: '123',
    text: 'how are you',
    user: {
      username: 'Admin'
    }
  },
  {
    id: 3,
    event: '123',
    text: 'hello, good and you?',
    user: {
      username: 'Student'
    }
  },
  {
    id: 4,
    event: '123',
    text: 'great, thanks',
    user: {
      username: 'Admin'
    }
  },
  {
    id: 4,
    event: '123',
    text: 'great, thanks',
    user: {
      username: 'Admin'
    }
  },{
    id: 4,
    event: '123',
    text: 'great, thanks',
    user: {
      username: 'Admin'
    }
  }
]

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [html, setHtml] = useState('')
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const room_pk = 1;
  const request_id = Date.now();

  const connect = () => {
    const token = localStorage.getItem('Token');
    socket.current = new WebSocket(
      `ws://35.239.173.63/ws/chat/?token=${token}`);
    socket.current.onopen = function () {
        const joinMessage = {
            pk: room_pk,
            action: "join_room",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(joinMessage));
        const retrieveMessage = {
            pk: room_pk,
            action: "retrieve",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(retrieveMessage));
        const subscribeMessage = {
            pk: room_pk,
            action: "subscribe_to_messages_in_room",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(subscribeMessage));
        const subscribeInstanceMessage = {
            pk: room_pk,
            action: "subscribe_instance",
            request_id: request_id,
        };
        socket.current.send(JSON.stringify(subscribeInstanceMessage));
        setConnected(true);
    };
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    localStorage.setItem('Token' , token.access);
    connect();
  }, []);

  const sendMessage = () => {
    socket.current.send(JSON.stringify({
        message: value,
        action: "create_message",
        request_id: request_id,
    }));

    setValue('');
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

        socket.current.onclose = (e) => {
          console.log('WebSocket is closed', e);
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
    <div className='chat'>
      {/* <div className='chat__messages'>
        {messagesTest.map((mess) => {
          return (
            <div key={mess.id} className={`chat__message ${mess.user.username == 'Admin' ? 'left-message' : 'right-message'}`}>
              <p className='chat__message-icon'>{mess.user.username.charAt(0)}</p>
              <p>{mess.text}</p>
            </div>
          );
        })}
      </div> */}
      {/* <form action="" onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}>
        <input
          className='chat__inp'
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='chat__btn'>send</button>
      </form> */}
      <DefaultEditor value={html} onChange={(e) => setHtml(e.target.value)}  />
    </div>
  );
};

export default Chat;