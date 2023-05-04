import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
// const str = 'She__inpa__inpdress and hair__inp abc';





const Inputs = ({descr , handleAnswer , caseInfo , caseDetail , handleCaseDetail}) => {
  const [str , setStr] = useState('');
  const { id  , task_id} = useParams();
  

  const getStr=async()=>{
    // setStr(data.str)
  }
  useEffect(()=>{
    setStr(descr)
  },[])

  useEffect(() => {
    handleCaseDetail(id, task_id);
  }, [id, task_id]);
  useEffect(() => {
    if (caseDetail) {
      setStr(caseDetail?.description);
    }
  }, [caseDetail]);
const inputCount = str.split('__inp__').length - 1;


  const [inputValues, setInputValues] = useState(Array(inputCount).fill(''));
  const [obj, setObj] = useState({});

  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    if (newInputValues[inputCount - 1] === '') {
      newInputValues.pop();
    }
    setInputValues(newInputValues);
  };

  const spl = (arr) => {
    let newArr = arr.join(',');
    const obj = {
      answers: newArr
    };
    setObj(obj);
  };




  const inputArr = str.split('__inp__').map((value, index) => {
    return (
      <React.Fragment key={index}>
        {value}
        {index < inputCount && (
          <input
          style={{ border:'3px dotted black' , borderTop:'none' , borderLeft:'none' , borderRight:'none'  , outline:'none' , textAlign:'center' , width:'100px'}}
            onChange={(e) => {
              handleInputChange(e, index);
              spl(inputValues)
            }}
            value={inputValues[index] || ''}
          />
        )}
      </React.Fragment>
    );
  });

  return <div>{inputArr}
  <button onClick={()=>handleAnswer(obj , caseInfo.tasks?.[task_id-1].id)}>send</button>
  </div>;
};

export default Inputs;
