import React, { useEffect } from 'react';
import { useUsers } from '../../contexts/UsersContextProvider';

// const studentsList = [{name: 'Sultan', progress: 74}, {name: 'Someone', progress: 96}, {name: 'Someone Another', progress: 55}]

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

  const { getStudents, studentsList } = useUsers();

  useEffect(() => {
    getStudents();
  }, [])

  console.log(studentsList)
  
  return (
    <div style={container}>
      <div style={headers}>
        <h2 style={{width: '40%'}}>Students</h2>
        <h2>Progress</h2>
      </div>
      {
        studentsList.length ? 
         studentsList.map((student, index) => (
          <div style={studentRow} key={index}>
            <div style={{width: '40%'}}>{student.username}</div>
            <div style={{ backgroundColor: '#9bd0cb', width: '25%', borderRadius: '10px', position: 'relative' }}>
              <span style={{color: 'white', fontSize: '15px', alignItems: 'center', position:'absolute',display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>25 %</span>
              <div style={{display: 'flex',width: "25%", height: '100%', borderRadius: '10px',  backgroundColor: '#E29578'}}></div>
            </div>
          </div>
        ))
         :
        <h5 style={{marginTop: '20px'}}>loading...</h5>
      }
    </div>
  );
};

export default StudentsList;