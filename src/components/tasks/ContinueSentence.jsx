import { Box, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const styles = {
  main: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between',
    mt: 2,
  },
  words: {
    bgcolor: '#9bd0cb',
    color: '#006D77',
    margin: '5px 0',
    padding: '10px',
    width: '100%',
    cursor: 'pointer',
    transition: '150ms',
    textAlign: 'center',
    borderRadius: '5px',
    "&:hover": {
      bgcolor: '#93c7c2',
    }
  },
  wordsContainer: {
    width: '42%',
  }
}

const data = ['lorem some', 'words', 'have to', 'get'];
const dataSecond = ['thing', 'are so strong', 'dooo', 'a girl'];




const ContinueSentence = ({taskBox}) => {
  const obj={
    first:[]
  }

  const [arr , setArr] = useState({
first:[],
second:[],
third:[],
fourth:[],
  })

// console.log(obj);
const pushFunc=(item)=>{
  if(obj.first.length < 2){
    obj.first.push(item)
  }
  else{
    obj.first.splice(1,1,item)
    
  }
}
const checkArr = (index) => {
  for(let key in arr){
    arr[key].forEach((i, index2)=>{
        if(i.id === index){
          const newArr = {...arr}
          console.log(newArr, '-------------------');
          newArr[key].splice(0, 1)
          setArr(newArr)
          
        }
    })
  }
}

const addArr = (item, index) => {

  if(arr.first.length < 2) {
    checkArr(index);
    const newArr = JSON.parse(JSON.stringify(arr))

    newArr.first.push({
        word: item,
        picked: true,
        id: index,
    })
    setArr(newArr)
  }
  //      else if(arr.second.length <2) {
      
  //     const newArr = {...arr}
  //     newArr.second.push ( {
  //         word:item,
  //         picked:true,
  //         id:index,
  //     })
  //   }
  //     else if(arr.third.length <2) {
        
  //       const newArr = {...arr}
  //       newArr.third.push ( {
  //           word:item,
  //           picked:true,
  //           id:index,
  //       })
  //     }
  //      else if(arr.fourth.length <2) {
          
  //         const newArr = {...arr}
  //         newArr.fourth.push ( {
  //             word:item,
  //             picked:true,
  //             id:index,
  //         })
  // }
  


}


  return (
    <>
      <Box sx={taskBox}>
        <Typography variant="h6" color="secondary">Упражнение № 4</Typography>
        <Box sx={styles.main}>
          <Box sx={styles.wordsContainer}>
            {
              data.map((item , index) => (
                <Typography key={index} sx={styles.words} onClick={()=>{
                  // pushFunc(item)

                  addArr(item,index);
                }}>{item}</Typography>
              ))
            }
          </Box>
          <Box sx={styles.wordsContainer}>
            {
              dataSecond.map((item , index) => (
                <Typography key={index + data.length} sx={styles.words} onClick={()=>{
                  addArr(item, index + data.length)

                }}>{item}</Typography>
              ))
            }
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContinueSentence;