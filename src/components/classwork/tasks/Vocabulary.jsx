import React, { useEffect, useState } from 'react';

const Vocabulary = ({task = []}) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    setWords(task[0]?.description.split('\r\n'))
  }, [task])

  return (
    <>
      <h2>Vocabulary</h2>
      <div className='vocabulary-box'>
        {
          words?.map((word, index) => (
            <p className='vocabulary-word' key={index}>{word.toLowerCase()}</p>
          ))
        }
      </div>
    </>
  );
};

export default Vocabulary;