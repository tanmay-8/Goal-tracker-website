import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../Images/logo.png";
import logoutImg from "../Images/logout.png";
import Body from "./Body";

const Home = () => {
  // state to set search text
  const [searcht, setSearcht] = useState("");

  const nevigate = useNavigate();

  const toLogin = () => {
    nevigate("/Signup");
  };

  // if not logged in
  useEffect(() => {
    if (localStorage.getItem("Goal-token") === null) {
      toLogin();
    }
    // eslint-disable-next-line
  }, []);

  // setting search text
  const onSearch = (e) => {
    setSearcht(e.target.value);
  };

  const logout = () => {
    localStorage.removeItem("Goal-token");
    toLogin()
  };

  return (
    <div>
      <div className="flex py-3 px-2 space-x-2 shadow-md items-center justify-between font-nav">
        <div className="w-12 cursor-pointer">
          <img src={logoImg} alt="logo" className="w-12"></img>
        </div>
        <div className="w-3/4 md:w-1/2 flex space-x-2 items-center">
          <input
            type={"search"}
            className="text-lg md:text-xl w-11/12 py-3 px-2 border-2 border-gray-300 rounded-lg outline-gray-500 focus:border-0"
            placeholder={"🔎︎ Search Goal..."}
            onChange={(e) => {
              onSearch(e);
            }}
          ></input>
        </div>
        <div className="w-12  space-x-4 flex" onClick={logout}>
          <img src={logoutImg} alt="logo" className="w-12 cursor-pointer"></img>
        </div>
      </div>
      <Body searcht={searcht} />
    </div>
  );
};

export default Home;
