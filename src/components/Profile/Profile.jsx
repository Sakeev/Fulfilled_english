import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  function check(arr) {
    console.log(this);
  }

  check([1, 2, 3]);

  const user = {
    name: "John",
    lastName: "Snow",
    birthDate: "01.02.1992",
    image: "../../assets/images/student.jpg",
    aboutMe: "",
    something: "",
  };

  const btnStyle = {
    margin: "10px 5px",
    backgroundColor: "#83c5be",
    color: "#006D77",
    border: "1px solid #83c5be",
    textTransform: "none",
  };

  return (
    <div className="profile">
      <section className="profile_info">
        <img
          //   src={user.image}
          src="https://i.insider.com/5fd7c083e00bce00188bb457?width=600&format=jpeg&auto=webp"
          alt=""
          className="info_img"
          width="30%"
          height="85%"
        />
        <div className="info_mainside">
          <h3 className="main_side-title"></h3>
          <p className="main_side-status"></p>

          <span className="main_side-email"></span>
          <span className="main_side-level"></span>

          <div className="main_side-progress">
            <span></span>
            <div className="progress_bar"></div>
          </div>
        </div>
      </section>
      <section className="profile_schedule"></section>
    </div>
  );
};

export default Profile;
