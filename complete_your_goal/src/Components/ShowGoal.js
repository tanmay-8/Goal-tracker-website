import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import goalContext from "../Contexts/goalContext";
import backImg from "../Images/back.png";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const ShowGoal = () => {
  // initialize log
  const [log, setLog] = useState({
    desc: "",
    increasedBy: 0,
  });

  // using goal context
  const context = useContext(goalContext);
  const { getGoal, goal, addLog } = context;

  const nevigate = useNavigate();
  const location = useLocation();

  //id of current goal
  const id = location.state.id;

  // reversing log to show last one first
  const reverseIt = (logs) => {
    logs = logs.reverse();
    return logs;
  };

  // getting goal
  useEffect(() => {
    if (id) {
      getGoal(id);
    }
    // eslint-disable-next-line
  }, [id]);

  // adding log
  const submit = (e) => {
    e.preventDefault();
    let desc = document.getElementById("desc");
    let increasedBy = document.getElementById("increasedBy");
    let newLog = {
      desc: desc.value,
      increasedBy: increasedBy.value,
    };
    setLog(newLog);
    addLog(log, id);
    desc.value = "";
    increasedBy.value = "";
  };

  return (
    <div>
      {goal !== null ? (
        <div
          style={{
            color: goal.color_scheme.textColor,
          }}
          className="min-h-screen pb-4"
        >
          {/* title */}
          <div
            className="p-1 text-2xl md:p-2 md:text-3xl font-bold flex items-center w-full"
            style={{ backgroundColor: goal.color_scheme.headerFooter }}
          >
            <img
              src={backImg}
              alt="back"
              className="w-10 cursor-pointer"
              onClick={() => nevigate(-1)}
            ></img>
            <h1 className="text-center w-full">{goal.title}</h1>
          </div>
          {/* Other info */}
          <div
            className="md:flex p-2 shadow-lg m-2 border-2"
            style={{
              borderColor: goal.color_scheme.headerFooter,
              backgroundColor: goal.color_scheme.bg,
            }}
          >
            <div className="w-32 mx-auto items-center flex">
              <CircularProgressbarWithChildren
                value={goal.nowprogress}
                styles={buildStyles({
                  pathColor: goal.color_scheme.progressBarColor,
                })}
              >
                <strong className="text-xl">{goal.nowprogress}%</strong>
              </CircularProgressbarWithChildren>
            </div>
            <div className="md:w-4/5 font-semibold text-lg space-y-2">
              <p>
                <span className="underline">Description:</span>
                <br></br>
                {goal.desc}
              </p>
              <p>
                <span className="underline">Type:</span>
                <br></br>
                {goal.type}
              </p>
              <div className="flex space-x-4">
                <p>
                  <span className="underline">Daily Progress:</span>
                  <br></br>
                  {goal.daily_progress}%
                </p>
                <p>
                  <span className="underline">Started on:</span>
                  <br></br>
                  {goal.date.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          <div
            className="m-2 p-2 shadow-lg border-2 "
            style={{
              borderColor: goal.color_scheme.headerFooter,
              backgroundColor: goal.color_scheme.bg,
            }}
          >
            <div className="px-2 pt-4 pb-8 w-full">
              {/* to add log */}
              <form onSubmit={submit}>
                <textarea
                  type={"text"}
                  name="desc"
                  id="desc"
                  required={true}
                  minLength={30}
                  maxLength={400}
                  placeholder={"Description"}
                  className="w-full h-24 resize-none p-2 border border-gray-500 rounded-md outline-none focus:border-gray-600"
                  autoFocus={true}
                  autoComplete="off"
                ></textarea>
                <div className="flex items-center space-x-3">
                  <input
                    className="p-2 border border-gray-500 rounded-md outline-none focus:border-gray-600 w-full"
                    type={"number"}
                    name="increasedBy"
                    id="increasedBy"
                    min={0}
                    max={100 - goal.nowprogress}
                    required={true}
                    placeholder={"Progress by"}
                  ></input>
                  <input
                    type={"submit"}
                    value={"Add log"}
                    className="cursor-pointer text-lg font-semibold px-4 py-2 bg-green-500 text-yellow-50 rounded-lg shadow-md hover:scale-110"
                    name="increasedBy"
                  ></input>
                </div>
              </form>
            </div>
            {/* Showing logs */}
            <h1 className="px-2 py-1 text-lg font-bold">Logs</h1>
            <hr className="-mx-2"></hr>
            {reverseIt(goal.logs).map((log) => {
              let date = log.time.split("T")[0];
              let time = log.time.split("T")[1].split(".")[0];
              return (
                <div key={log._id}>
                  <div className="px-2 py-4 space-y-3">
                    <p className="text-sm">
                      {date}&nbsp;&nbsp;{time}
                    </p>
                    <p className="text-lg font-semibold">{log.desc}</p>
                    <p className="text-lg font-semibold">
                      Progress by {log.increasedBy}%
                    </p>
                    <p className="text-lg font-semibold">
                      Progress after log {log.progressNow}%
                    </p>
                  </div>
                  <hr className="-mx-2"></hr>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Nothing to show.</div>
      )}
    </div>
  );
};

export default ShowGoal;
