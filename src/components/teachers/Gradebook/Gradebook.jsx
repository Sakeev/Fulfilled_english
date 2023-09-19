import { useSchedule } from "contexts/ScheduleContextProvider";
import React, { useEffect } from "react";

const Gradebook = () => {
  const { gradebook, getGradebook } = useSchedule();

  useEffect(() => {
    getGradebook();
  }, [getGradebook]);

  console.log(gradebook);
  return <div>gradebook</div>;
};

export default Gradebook;
