import { Box, Button, LinearProgress, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../contexts/TasksContextProvider';
import ContinueSentence from './tasksType/ContinueSentence';
import PagBar from './PagBar';
import Progress from './Progress';
import WordFind from './WordFind';
import SideBar from '../Sidebar'
import { margin, width } from '@mui/system';
import Inputs from '../tasks/tasksType/Inputs'
import Sentence from './tasksType/Sentence';

const Case1 = () => {
    const { id  , task_id} = useParams();
    const [compl , setCompl] = useState([]);

    const {handleCaseDetail,progObj,getProgress,handleCase,cases,editProgress , taskProgress,countTasksProgress, caseDetail , singleCase  , oneCase , handleAnswer , infoCase , caseInfo} = useTasks();
    const [count , setCount] = useState(0);
    const{tasks} = caseDetail;
    const [disabled , setDisabled] = useState(true);
    const navigate = useNavigate()
    useEffect(()=>{
        infoCase(id);
        handleCase()
    },[])

    // console.log(caseInfo);


const checkCompl=()=>{
    handleCase();
    if(oneCase?.passed_quantity == oneCase?.quantity_task){
        setDisabled(false)
    }
    else{
        setDisabled(true)
    }
}

    useEffect(()=>{
        handleCaseDetail(id , task_id)
    },[id , task_id])

    
    useEffect(()=>{
        singleCase(id); 
        setCount(oneCase?.quantity_task)
    },[oneCase?.quantity_task])

    const [answer,setAnswer] = useState("")

const answerObj={
    answers:answer
}



const boxStyle = {
    display:'flex',
    marginLeft:'10%' ,
    display:'flex' ,
    flexDirection:'column' ,
    alignItems:'center',
    width:'100%',
    height:'100%',
    
}
const taskBoxStyle={
    width:'50vw',
    height:'35vw',
    border:"2px solid #006D77",
    borderRadius:'22px',
    margin:'3%'
}
    const checkRes =(newElement)=>{
        const newCompl = [...compl, newElement];
        setCompl(newCompl);
    }

useEffect(() => {
    singleCase(id)
    if (oneCase?.passed_quantity === oneCase?.quantity_task) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [oneCase?.passed_quantity]);

// console.log(caseInfo);

let component = null;

switch (caseDetail?.implemented_case) {
  case 'missing word':
    component = (
      <Inputs
        descr={caseDetail?.description}
        id={id}
        task_id={task_id}
        handleAnswer={handleAnswer}
        caseInfo={caseInfo}
        caseDetail={caseDetail}
        handleCaseDetail={handleCaseDetail}
      />
    );
    break;
  case 'build ':
    component = (
      <Sentence
        descr={caseDetail?.description}
        id={id}
        task_id={task_id}
        handleAnswer={handleAnswer}
        caseInfo={caseInfo}
        caseDetail={caseDetail}
        handleCaseDetail={handleCaseDetail}
      />
    );
    
    break;
    case 'build sentence':
    component = (
      <ContinueSentence
        descr={caseDetail?.description}
        id={id}
        task_id={task_id}
        handleAnswer={handleAnswer}
        caseInfo={caseInfo}
        caseDetail={caseDetail}
        handleCaseDetail={handleCaseDetail}
      />
    );
    
    break;
  default:
    component = null;
    break;
}

return (
  <>
    {component}
    <PagBar count={count} sx={{ alignSelf: 'center' }} />
  </>
);



    return (
        <div style={{width:'100%' , height:'100%' , overflow:'hidden' }}>
            <SideBar />
            <Box style={boxStyle}>  
                <Box style={taskBoxStyle}>
                    <h1 style={{margin:'5%' , color:'#006D77'}}>{caseDetail?.title}</h1>
                    <p style={{margin:'5%' , color:'#006D77' ,  height:'20vw',}}>{caseDetail?.description}</p>
                    <div style={{margin:'5%'}}>
                    </div>
                    <LinearProgress variant="determinate" sx={{backgroundColor:'#83C5BE'}} value={task_id *10} />
                    </Box>
                    <Box sx={{display:"flex" , width:'70vw'  , justifyContent:'center' , alignItems:'center'}}>
                        <TextField placeholder='write your answer here' sx={{width:'30%' , alignSelf:'center', margin:'2%'}} value={answer} onChange={(e)=>setAnswer(e.target.value)}></TextField> 
                        <Button onClick={async()=>{
                            await handleAnswer(answerObj , caseInfo.tasks?.[task_id-1].id);
                            checkRes('*');
                            checkCompl();
                            singleCase(id)
                            setAnswer('');
                            }} sx={{backgroundColor:"#83C5BE" , color:"#006D77" , width:"12%" }} >Отправить</Button>
                    </Box>
                    <PagBar count = {count} sx={{alignSelf:'center'}}/>
                    <Button disabled={disabled} onClick={()=>{
                        navigate('results')
                        setCompl([])
                        }} sx={{backgroundColor:"#83C5BE" , color:"#006D77" , width:"12%" , margin:'1%' }}>check res</Button>
            </Box>
        </div>
    );
};

export default Case1;