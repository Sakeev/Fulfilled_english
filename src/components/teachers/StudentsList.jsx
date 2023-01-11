import React from 'react';

const studentsList = [{name: 'Sultan', progress: 74}, {name: 'Someone', progress: 96}, {name: 'Someone Another', progress: 55}]

const container = {
  width: '75%',
  margin: '0 auto',
  marginTop: '50px',
  maxHeight: '90vh',
  height: '80vh',
  border: '1px solid #9bd0cb',
  borderRadius: '10px',
  padding: '20px'
}

const headers = {
  color: '#006D77',
  width: '100%',
  borderBottom: '1px solid #9bd0cb',
  height: '5%',
  display: 'flex',
}

const studentRow = {
  width: '100%',
  margin: '10px 0',
  borderBottom: '1px solid #9bd0cb',
  padding: '10px 0',
  display: 'flex'
}

const StudentsList = () => {
  return (
    <div style={container}>
      <div style={headers}>
        <h2 style={{width: '40%'}}>Students</h2>
        <h2>Progress</h2>
      </div>
      {
        studentsList.map((item) => (
          <div style={studentRow}>
            <div style={{width: '40%'}}>{item.name}</div>
            <div style={{ backgroundColor: '#9bd0cb', width: '25%', borderRadius: '10px', position: 'relative' }}>
              <span style={{color: 'white', fontSize: '15px', alignItems: 'center', position:'absolute',display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>{item.progress} %</span>
              <div style={{display: 'flex',width: item.progress + "%", height: '100%', borderRadius: '10px',  backgroundColor: '#E29578'}}></div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default StudentsList;