import { useState } from "react";
import goalContext from './goalContext'


const GoalState = (props) => {

  //goals
  const [goals, setGoals] = useState([]);

  // goal
  const [goal, setGoal] = useState(null)


  //getting goals
  const getGoals =async()=>{
    const response = await fetch("http://localhost:5000/api/goal/getgoals",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("Goal-token")
      }
    })

    let json = await response.json()
    setGoals(json)
  }

  //getting goal
  const getGoal =async(id)=>{
    const response = await fetch("http://localhost:5000/api/goal/getgoal/"+id,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("Goal-token")
      }
    })
    // console.log(id)
    let json = await response.json()
    // console.log(json)
    setGoal(json)
  }

  //adding goal
  const addGoal = async (goal) => {
    console.log("run")
    // api call
    const response = await fetch("http://localhost:5000/api/goal/addgoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Goal-token"),
      },
      body:JSON.stringify(goal),
    });
    let json = await response.json()
    getGoals()
    return json
  };

  // adding log
  const addLog = async (log,id) => {
    console.log("run")
    // api call
    const response = await fetch("http://localhost:5000/api/goal/addlog/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Goal-token"),
      },
      body:JSON.stringify(log),
    });
    let json = await response.json()
    getGoal(id)
    console.log(json)
    return json
  };

  return (
    //sending props in context
    <goalContext.Provider
      value={{
        goals,addGoal,getGoals,goal,getGoal,addLog
      }}
    >
      {props.children}
    </goalContext.Provider>
  );
};

export default GoalState;
