import React from 'react';

const container = {
  margin: '0 auto',
  width: '90%',
  padding: '50px 70px',
}

const timeline = {
  margin: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '130px',
}

const weekday = {
  width: '30px',
}

const timeblock = {
  minWidth: '100px',
  width: '20%',
  height: '90%',
  border: '1px solid #83C5BE',
  borderRadius: '10px',
  margin: '0 5px',
}

const timeline_head = {
  
}

const ScheduleTeachers = () => {
  return (
    <div style={container}>
      <div style={timeline_head}>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div style={timeline}>
        <div style={weekday}>Mon</div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
      </div>
      <div style={timeline}>
        <div style={weekday}>Tue</div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
      </div>
      <div style={timeline}>
        <div style={weekday}>Wen</div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
      </div>
      <div style={timeline}>
        <div style={weekday}>Thu</div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
      </div>
      <div style={timeline}>
        <div style={weekday}>Fri</div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
        <div style={timeblock}></div>
      </div>
    </div>
  );
};

export default ScheduleTeachers;