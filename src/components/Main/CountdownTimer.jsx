import React, { useState, useEffect } from "react";

function CountdownTimer({ startTime }) {
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
    <div>
      {minutes > -61 ? (
        showStartButton ? (
          <button>Join to room</button>
        ) : seconds < 0 ? (
          setShowStartButton(true)
        ) : (
          <div>
            <p>Remaining time</p>
            <p>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </p>
          </div>
        )
      ) : (
        <button>You haven't lesson</button>
      )}
    </div>
  );
}

export default CountdownTimer;
