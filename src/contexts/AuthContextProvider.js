import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API } from "../helpers/consts";

export const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const register = async (email, password) => {
  //   const config = {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   };
  //   let formData = new FormData();
  //   formData.append("email", email);
  //   formData.append("password", password);

  //   try {
  //     const res = await axios.post(`${AUTH_API}`, formData);
  //     localStorage.setItem("token", JSON.stringify(res.data));
  //     localStorage.setItem("username", email);
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //     setError("error occured");
  //   }
  // };
  const token=async(email , password)=>{
    let formData = {
      email,
      password,
    };
    
    console.log(formData)
    try {
      const res  = await axios.post(`${AUTH_API}`,formData ) 
          localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("username", email);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  //   const activation = async (str) => {
  //     const config = {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     };
  //     let formData = new FormData();
  //     formData.append("activation_code", str);
  //     navigate("/login");
  //     try {
  //       const res = await axios.post(
  //         `${AUTH_API}/activation/`,
  //         {
  //           activation_code: str,
  //         },
  //         config
  //       );
  //       console.log(res);
  //     } catch (error) {
  //       setError("error activation");
  //     }
  //   };

  async function login(username, password) {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);
    console.log(formData);

    try {
      let res = await axios.post(`${AUTH_API}/login/`, formData, config);
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("username", username);
      setUser(username);
      navigate("/home");
    } catch (error) {
      setError("error occured");
    }
  }

  async function checkAuth() {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      const Authorization = `Bearer ${token.access}`;

      let res = await axios.post(
        `${AUTH_API}/token/refresh/`,
        {
          refresh: token.refresh,
        },
        {
          headers: { Authorization },
        }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          refresh: token.refresh,
          access: res.data.access,
        })
      );

      let userName = localStorage.getItem("username");
      setUser(userName);
    } catch (error) {
      
    }
  }

  // function logout() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("username");
  //   setUser("");
  // }

  return (
    <authContext.Provider
      value={{
        
        token,
        login,
        user,
        error,
        checkAuth,
        
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
