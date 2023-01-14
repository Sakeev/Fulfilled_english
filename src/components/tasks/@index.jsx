import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTasks } from '../../contexts/TasksContextProvider';
import ContinueSentence from './ContinueSentence';
import FillInps from './FillInps';
import Sentence from './Sentence';
import WordFind from './WordFind';

const mainBox = {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 0'
}

const taskBox = {
  display: 'flex',
  flexDirection: 'column',
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#006D77'
    }
  }
})



const Tasks = () => {
  const {handleTask  , tasks , sent , fillInps , wordFind , handleAnswer , getAnswers , answers} = useTasks();
  
  const result = answers.slice(answers.length-3,answers.length) ;  

  const [count , setCount] = useState('');

  useEffect(()=>{
    handleTask()
  },[])

  const ansObj = {
    sent,
    fillInps,
    wordFind,
  }

  const finalObj = {
    "answer":'fdsaf',
    "tasks":1,
  }

  console.log(wordFind.toString());


  let formData = new FormData();
  formData.append("answer", wordFind);
  formData.append("tasks", 2);

  let formData2 = new FormData();
  formData2.append("answer", `${fillInps.first} , ${fillInps.second}`);
  formData2.append("tasks", 3)

  let formData3 = new FormData();
  formData3.append("answer", `${sent.join()}`);
  formData3.append("tasks", 4)

  

  const sendAnswers=()=>{
    handleAnswer(formData)
    handleAnswer(formData2)
    handleAnswer(formData3)
    getAnswers();
     
  }


  const alertAnswers=()=>{
    alert(result[0]?.answer+'->' + result[0]?.accepted )
    alert(result[1]?.answer+'->' + result[1]?.accepted )
    alert(result[2]?.answer+'->' + result[2]?.accepted )
  }

  const abc = JSON.stringify(finalObj);
   
  console.log(ansObj);

  {
    
  }


  return (
    <ThemeProvider theme={theme}>
      <Box sx={mainBox}>
        <WordFind taskBox={taskBox} />
        <FillInps taskBox={taskBox} />
        <Sentence taskBox={taskBox} />
        <ContinueSentence />
        <Button variant="success" onClick={()=>{
          sendAnswers()
          setCount('go')
          }}>Отправить</Button>
          <Button variant="success" onClick={()=>{
          alertAnswers()
          }}>Посмотреть результаты</Button>
      </Box>
      {/* <img style={{position: 'absolute', left: '1000px', top: '100px'}} src="https://plus.unsplash.com/premium_photo-1661759476421-af5519793034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8em9vbSUyMGNhbGx8ZW58MHx8MHx8&w=1000&q=80" alt='2' width='400' height="300" /> */}
    </ThemeProvider>
  );
};

export default Tasks;