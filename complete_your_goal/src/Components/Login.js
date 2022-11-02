import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImg from "../Images/person.png";

const Login = () => {
  const nevigate = useNavigate();

  const style1 = {
    wordSpacing: "5px",
  };

  // initializing credentials
  const [cred, setCred] = useState({ email: "", password: "" });

  //to set credentials on change of input
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    let alert = document.getElementById("alert");
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });

      const json = await response.json();

      if (json.success) {
        nevigate("/");
        localStorage.setItem("Goal-token", json.authtoken);
      } else if (!json.success) {
        alert.innerHTML = "Use correct credentials.";
      } else {
        alert.innerHTML = "Internal server error.";
      }
    } catch {
      alert.innerHTML = "Internal server error.";
    }
  };

  return (
    <div className="py-4  bg-gradient-to-r from-purple-600 to-blue-400 min-h-screen">
      <h1
        className="text-3xl md:text-4xl font-bold py-2 my-6 font-head text-white text-center"
        style={style1}
      >
        Take a step towards completing your goal !
      </h1>

      <div className="w-11/12 lg:w-1/3 md:w-1/2 bg-white bg-opacity-30 mx-auto rounded-lg shadow-lg mt-1 font-head text-gray-700">
        <div className="py-2">
          <img src={personImg} alt="person" className="mx-auto"></img>
          <form className="py-4 px-3 space-y-4 font-bold" onSubmit={login}>
            <input
              className="w-full text-xl p-2 bg-white bg-opacity-30 rounded-md placeholder:font-normal border-1 border-gray-400 outline-none focus:border-gray-600"
              placeholder="email"
              type={"email"}
              required={true}
              name="email"
              onChange={onChange}
            ></input>
            <input
              className="w-full text-xl p-2 bg-white bg-opacity-30 rounded-md placeholder:font-normal border-1 border-gray-400 outline-none focus:border-gray-600"
              placeholder="password"
              type={"password"}
              minLength={8}
              maxLength={18}
              name="password"
              onChange={onChange}
            ></input>
            <div className="flex justify-center items-center">
              <input
                type={"submit"}
                value={"Login"}
                className="p-3 bg-indigo-500 text-xl text-white w-fit rounded-md shadow-lg cursor-pointer hover:scale-110 transition-all"
              ></input>
            </div>
          </form>
        </div>
      </div>
      <div id="alert" className="font-bold text-center p-1 text-red-500"></div>
      {/* Features */}
      <div className="md:flex w-full p-4 md:w-full text-center justify-center items-center mx-auto mt-10">
        <div className="px-4 py-1 space-y-3 text-lg text-white font-head  md:flex md:space-x-6 md:space-y-0 font-bold">
          <div className="bg-yellow-300 bg-opacity-50 p-2 text-gray-700 rounded-md shadow-lg hover:scale-105 transition-all">
            Easy to use.
          </div>
          <div className="bg-yellow-300 bg-opacity-50 p-2 text-gray-700 rounded-md shadow-lg hover:scale-105 transition-all">
            Add your goals.
          </div>
          <div className="bg-yellow-300 bg-opacity-50 p-2 text-gray-700 rounded-md shadow-lg hover:scale-105 transition-all">
            Add daily logs.
          </div>
          <div className="bg-yellow-300 bg-opacity-50 p-2 text-gray-700 rounded-md shadow-lg hover:scale-105 transition-all">
            Track your daily progress.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
