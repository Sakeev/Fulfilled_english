import { Box, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import image from "../components/images/Sticker_pack02_Группа 18.png";

const ProfilePage = () => {
  let handleCount = (e) => {
    document.querySelector("output").textContent = 60 - e.target.value.length;
  };

  const [style, setStyle] = useState("inp");
  const fontBolder = () => {
    if (style == "inp") {
      setStyle("inp2");
    } else {
      setStyle("inp");
    }
  };

  const fontCursive = () => {
    if (style == "inp") {
      setStyle("inp3");
    } else {
      setStyle("inp");
    }
  };
  let progresswidth = 90;

  console.log(style);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3%" }}>
      <Box
        sx={{
          width: "80%",
          height: "50vw",
          border: "5px solid #83C5BE",
          display: "flex",
          borderRadius: "20px",
          backgroundColor: "#EDF6F9",
          color: "#006D77",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "30%",
            borderRight: "2px solid #83C5BE",
            margin: "0 auto !important",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{width:"100%" , display:"flex" , justifyContent:"center" , flexDirection:"column" , marginTop:"50%"}}>
          <img
            src={image}
            style={{
              width: "50%",
              height: "70%",
              paddingTop: "5%",
              paddingBottom: "5%",
              alignSelf: "center",
            }}
          />
          <p style={{ margin: "0 auto" }}>Дастан</p>
          <p style={{ margin: "0 auto" }}>Буларкиев</p>
          <p style={{ margin: "0 auto" }}>07.05.01</p>

          <button style={{  border: "none",
                  width: "30%",
                  height: "3.8vw",
                  borderRadius: "5px",
                  backgroundColor: "#006D77",
                  color: "white",
                  margin:"20px auto",
                  fontSize: "1vw",  }}> Вернуться назад</button>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            height: "100%",
            width: "70%",
          }}
        >
          <Box>
            <div
              style={{
                paddingBottom: "2%",
                borderBottom: "2px solid #83C5BE",
                paddingTop: "5%",
              }}
            >
              <p
                style={{
                  fontSize: "2vw",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Публичный профиль
              </p>
              <p style={{ textAlign: "center", paddingTop: "2%" }}>
                Добавьте информацию о себе
              </p>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              
              <p
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "bold",
                  paddingTop: "3%",
                  paddingBottom: "3%",
                  paddingLeft: "15%",
                  alignSelf: "start",
                }}
              >
                Основные сведения
              </p>
              <input
                style={{
                  width: "70%",
                  height: "3.5vw",
                  color: "#006D77",
                  paddingLeft: "2%",
                  border: "none",
                  fontSize: "1.1vw",
                  outline: "none",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                className="name"
                placeholder="Имя"
                type="text"
              />
              <div style={{ height: "1vw" }}></div>
              <input
                style={{
                  width: "70%",
                  height: "3.5vw",
                  color: "black",
                  paddingLeft: "2%",
                  border: "none",
                  fontSize: "1.1vw",
                  outline: "none",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "#006D77",
                }}
                className="surname"
                placeholder="Фамилия"
                type="text"
              />
              <div style={{ height: "1vw" }}></div>
              
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  style={{
                    width: "65%",
                    height: "3.5vw",
                    color: "black",
                    paddingLeft: "2%",
                    border: "none",
                    fontSize: "1.1vw",
                    borderRight: "0",
                    color: "#006D77",
                    outline: "none",
                    backgroundColor: "white",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  className="main"
                  placeholder="Основная компетенция"
                  type="text"
                  maxLength={60}
                  onInput={handleCount}
                />
                
                <div
                  style={{
                    border: "none",
                    width: "5%",
                    height: "3.5vw",
                    borderLeft: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <output></output>
                </div>
                
                
              </div>
              <h3 style={{paddingTop:"20px"}}>О себе</h3>
              <div
                style={{
                  marginTop: "3%",
                  border: "none",
                  width: "70%",
                  height: "3.5vw",
                  borderLeft: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#83C5BE",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#83C5BE",
                    width: "30%",
                    fontSize: "1.3vw",
                    color: "white",
                  }}
                  onClick={fontBolder}
                >
                  B
                </button>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#83C5BE",
                    width: "30%",
                    fontSize: "1.3vw",
                    color: "white",
                  }}
                  onClick={fontCursive}
                >
                  I
                </button>
              </div>
              <input
                type="text"
                style={{
                  border: "none",
                  width: "70%",
                  height: "3.5vw",
                  borderLeft: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  outline: "none",
                  paddingLeft: "2%",
                  color: "#006D77",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
                className={style}
              />
              <div style={{display:"flex" , justifyContent:'space-between' , width:"70%" , paddingTop:"20px"}}>
              <p>Ваш прогресс </p>
              <p>9/10 занятий</p>
              </div>
              <div class="container">
                <div
                  className="balance"
                  style={{
                    width: `${progresswidth}%`,
                    fontSize: "1.3vw",
                    color: "#006D77",
                    borderTopLeftRadius:"5px",
                    borderBottomLeftRadius:"5px"
                  }}
                >
                  
                </div>
              </div>
              <div style={{ height: "1vw" }}></div>
              
              <button
                style={{
                  border: "none",
                  width: "20%",
                  height: "3.5vw",
                  borderRadius: "5px",
                  backgroundColor: "#006D77",
                  color: "white",
                  fontSize: "1.1vw",

                  marginBottom:"20px"
                }}
              >
                save
              </button>
              
              
            </Box>
            <p></p>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;
