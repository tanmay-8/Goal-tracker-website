import React, { useContext, useEffect, useState } from "react";
import {buildStyles,CircularProgressbarWithChildren,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddImg from "../Images/add.png";
import AddGoal from "./AddGoal";
import goalContext from "../Contexts/goalContext";
import logoImg from "../Images/logo.png"
import { useNavigate } from "react-router-dom";
import LearningImg from "../Images/learning.png"
import FinancialImg from "../Images/financial.png"
import PersonalImg from "../Images/person.png"
import ProfessionalImg from "../Images/professional.png"
import FitnessImg from "../Images/fitness.png"


const Body = (props) => {

  const nevigate = useNavigate()

  // using goal context
  const context = useContext(goalContext)
  const {goals,getGoals} = context

  // trigger to show add goal to component
  const [trigger,setTrigger]=useState(false)

  // state to set search text
  const [searcht, setSearcht] = useState("");

  // to set image to goal according to type of goal
  const setImg=(type)=>{
    switch (type){
      case "Learning":
        return LearningImg;
      case "Financial":
        return FinancialImg;
      case "Fitness":
        return FitnessImg;
      case "Personal":
        return PersonalImg
      case "Professional":
        return ProfessionalImg
      default:
        return logoImg
    }
  }

  // getting goals
  useEffect(()=>{
    getGoals()
    // eslint-disable-next-line
  },[])

  //to set search text 
  useEffect(() => {
    setSearcht(props.searcht);
    // eslint-disable-next-line
  }, [props.searcht]);

  // to search goals according to searched text
  const searchedgoals = goals.filter((goal)=>{
    if(searcht.length<=1 || searcht===""){
      return goal
    }
    else{
      return goal.title.toLowerCase().includes(searcht.toLowerCase())
    }
  })

  return (
    <div className="py-2 p-1">
      <div className="flex py-2 px-2 mt-3 items-center space-x-3 justify-center text-white bg-green-400 w-fit
      cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 transition-all rounded-full mx-auto" onClick={()=>setTrigger(true)}>
        <img
          src={AddImg}
          alt="Add"
          className="w-10 h-10 shadow-md rounded-full invert"
        ></img>
      </div>
      <AddGoal trigger={trigger} setTrigger={setTrigger}/>

      {/* Showing goals */}
      <div className="px-2 text-center lg:text-left">
        {searchedgoals.map((goal) => {
          const title = goal.title;
          const desc = goal.desc;
          const color_scheme = goal.color_scheme;
          return (
            <div
              key={goal._id}
              className="block w-11/12 mx-auto md:inline-block md:w-w-45% lg:w-w-30% md:mx-4 my-6 md:my-4 rounded-lg shadow-xl cursor-pointer hover:-translate-y-2 transition-all border font-head"
              style={{
                backgroundColor: color_scheme.bg,
                color: color_scheme.textColor,
              }}
              onClick={()=>{nevigate("/Showgoal",{state:{id:goal._id}})}}
            >
              <div
                className="text-left p-2 text-lg font-bold rounded-t-lg flex items-center space-x-1"
                style={{ backgroundColor: color_scheme.headerFooter }}
              >
                <p className="w-full">{title}</p>
                <img src={setImg(goal.type)} className="w-8" alt="logo"></img>
              </div>
              <div className="flex space-x-2 p-2">
                <div className="w-full text-left p-1 font-semibold">
                  <p>
                    {desc.length > 60 ? (
                      <>{desc.slice(0, 60)}...</>
                    ) : (
                      <>{desc}</>
                    )}
                  </p>
                </div>
                <div className="w-28">
                  <CircularProgressbarWithChildren
                    value={goal.nowprogress}
                    styles={buildStyles({
                      pathColor: color_scheme.progressBarColor,
                    })}
                  >
                    <strong className="text-xl">{goal.nowprogress}%</strong>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
              <div
                className="p-2 rounded-b-lg text-sm font-semibold text-left"
                style={{ backgroundColor: color_scheme.headerFooter }}
              >
                Daily Progress{" : "}
                {goal.daily_progress}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
