import "./index.css";
import Home from "./Components/Home";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoalState from "./Contexts/GoalState";
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import ShowGoal from "./Components/ShowGoal";

function App() {
  return (
    <div className="App h-full">
      <GoalState>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Signup" element={<SignUp/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Showgoal" element={<ShowGoal/>}></Route>
        </Routes>
      </GoalState>
    </div>
  );
}

export default App;
