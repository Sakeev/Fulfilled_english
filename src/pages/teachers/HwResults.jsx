import React, { useEffect, useState } from "react";
import { useUsers } from "../../contexts/UsersContextProvider";
import { useParams } from "react-router-dom";

const rightAnswers = {
  border: "2px solid #83C5BE",
  borderRadius: "22px",
  width: "40vw",
  height: "100%",
  margin: "5%",
  fontSize: "24px",
  color: "#83C5BE",
};

const HwResults = () => {
  const { getOneHw, onehw } =
    useUsers();

  const { user_id, id } = useParams();
  useEffect(() => {
    getOneHw(user_id, id);
  }, []);

  const results = [];
  onehw.tasks?.map((item) => {
    results.push(item.answers[item.answers.length - 1]?.accepted);
  });
  const [color, setColor] = useState("#83C5BE");
  const yourAnswer = {
    color: `${color}`,
    border: `2px solid ${color}`,
    borderRadius: "22px",
    width: "40vw",
    height: "100%",
    margin: "5%",
    fontSize: "24px",
  };
  const isAllTrue = results.every((item) => {
    return item === true;
  });

  useEffect(() => {
    colorManager();
  }, [isAllTrue]);

  const colorManager = () => {
    isAllTrue ? setColor("#83C5BE") : setColor("#E29578");
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={rightAnswers}>
        <h1 style={{ margin: "20px" }}>Right answers</h1>
        <ol style={{ margin: "100px" }}>
          {onehw.tasks?.map((elem, key) => {
            return (
              <li style={{ margin: "20px" }} key={key}>
                {elem.right_answer}
              </li>
            );
          })}
        </ol>
      </div>
      <div style={yourAnswer}>
        <h1 style={{ margin: "20px" }}>Your answers</h1>
        {onehw.tasks?.map((elem, index) => {
          return (
            <div key={index} style={{ margin: "20px" }}>
              <div>
                {elem?.answers[elem?.answers.length - 1]?.accepted ? (
                  <p style={{ color: `#83C5BE`, margin: "5%" }}>
                    {" "}
                    {index + 1}.{" "}
                    {elem?.answers[elem?.answers.length - 1]?.answer}
                  </p>
                ) : (
                  <p style={{ color: `#E29578`, margin: "5%" }}>
                    {" "}
                    {index + 1}.{" "}
                    {elem?.answers[elem?.answers.length - 1]?.answer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HwResults;
