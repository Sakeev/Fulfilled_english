import React, { useEffect, useState } from "react";

const StudentBtn = ({ styles, joinLesson, startTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(startTime - new Date());
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const remaining = startTime - currentTime;
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setShowStartButton(true);
      }
    }, 1000); // Обновление каждую секунду
    return () => {
      clearInterval(interval);
    };
  }, [startTime, timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  return (
    <>
      {minutes > -61 && minutes < 30 ? (
        showStartButton ? (
          <div className={styles.startlesson}>
            <button className={styles.btnstudent}>Join the lesson</button>
            <div className={styles.timerBlock}></div>
          </div>
        ) : seconds < 0 && minutes < 0 ? (
          setShowStartButton(true)
        ) : (
          <div className={styles.startlesson}>
            <button className={styles.btnteacher}>You can't start</button>
            <div className={styles.timerBlock}>
              <span className={styles.timerText}>
                Before the start of class:
              </span>
              <span className={styles.timer}>
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </span>
            </div>
          </div>
        )
      ) : (
        <div className={styles.startlesson}>
          <button className={styles.btnteacher}>You can't start</button>
          <div className={styles.timerBlock}>
            <span className={styles.timerText}>
              Great job! Wait for your next lesson
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentBtn;
