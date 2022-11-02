import React, { useContext, useState } from "react";
import goalContext from "../Contexts/goalContext";
import Multiselect from "multiselect-react-dropdown";
import EmptyImg from "../Images/empty.jpg";

const AddGoal = (props) => {
  //initial progress
  const [progress, setProgress] = useState(0);

  //type of goal
  const [type, setType] = useState("Learning");
  const types = [
    { name: "Learning" },
    { name: "Financial" },
    { name: "Professional" },
    { name: "Fitness" },
    { name: "Personal" },
    { name: "Other" },
  ];

  // using goal context and getting add goal function
  const context = useContext(goalContext);
  const { addGoal } = context;

  // colors to choose as color-scheme for goal
  const [colors, setColors] = useState({
    name: "white",
    bg: "#FFFAE7",
    headerFooter: "#EFEFEF",
    textColor: "#292929",
    progressBarColor: "#a8a7a7",
  });
  const color_combinations = [
    {
      name: "Blue",
      bg: "#7DE5ED",
      headerFooter: "#81C6E8",
      textColor: "black",
      progressBarColor: "#5837D0",
    },
    {
      name: "green",
      bg: "#CFFF8D",
      headerFooter: "#A8E890",
      textColor: "#425F57",
      progressBarColor: "#749F82",
    },
    {
      name: "pink",
      bg: "#F8C4B4",
      headerFooter: "#FF8787",
      textColor: "#735070",
      progressBarColor: "#f54949",
    },
    {
      name: "yellow",
      bg: "#FFF38C",
      headerFooter: "#F0E161",
      textColor: "#6E6A45",
      progressBarColor: "#D9CB50",
    },
    {
      name: "white",
      bg: "#FFFAE7",
      headerFooter: "#EFEFEF",
      textColor: "#292929",
      progressBarColor: "#a8a7a7",
    },
    {
      name: "black",
      bg: "#3C4048",
      headerFooter: "#000000",
      textColor: "#EEEEEE",
      progressBarColor: "#B2B2B2",
    },
    {
      name: "purple",
      bg: "#C689C6",
      headerFooter: "#937DC2",
      textColor: "#182747",
      progressBarColor: "#FFABE1",
    },
    {
      name: "almond",
      bg: "#FDFDBD",
      textColor: "black",
      headerFooter: "#FFD372",
      progressBarColor: "#FFD384",
    },
  ];

  // initializing goal
  const [goal, setGoal] = useState({
    title: "",
    desc: "",
    type: "",
    initProgress: 0,
    color_scheme: colors,
  });

  // on change for input
  const onChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  // on selecting color-scheme
  const select = (i) => {
    let colorsh = document.getElementsByClassName("colorbt");
    for (let j = 0; j < colorsh.length; j++) {
      try {
        colorsh[j].classList.remove("border-2");
      } catch (err) {
        console.log(err);
      }
    }
    colorsh[i].classList.add("border-2");
    setColors(color_combinations[i]);
  };

  // to add goal
  const AddGoal = (e) => {
    e.preventDefault();
    goal.color_scheme = colors;
    goal.initProgress = progress;
    goal.type = type;
    addGoal(goal);
    props.setTrigger(false);
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  };

  return (
    <div className="transition-all m-2 bg-white w-11/12 lg:w-2/5 md:w-1/2 mx-auto">
      {/* If triggered */}
      {props.trigger ? (
        <div
          className="w-full border mx-auto transition-all shadow-xl"
          id="cont"
          style={{
            backgroundColor: colors.bg,
            color: colors.textColor,
          }}
        >
          {/* Color-schemes to select */}
          <div
            className="w-full text-center py-2 mb-2"
            style={{ backgroundColor: colors.headerFooter }}
          >
            {color_combinations.map((color_combination) => {
              return (
                <div
                  key={color_combination.name}
                  className={
                    color_combinations.indexOf(color_combination) === 4
                      ? "inline-block w-12 h-12 rounded-full mx-2 border-blue-700 cursor-pointer shadow-md colorbt border-2"
                      : "inline-block w-12 h-12 rounded-full mx-2 border-blue-700 cursor-pointer shadow-md colorbt"
                  }
                  style={{ backgroundColor: color_combination.bg }}
                  onClick={() => {
                    select(color_combinations.indexOf(color_combination));
                  }}
                ></div>
              );
            })}
          </div>
          <div className="p-2">

            {/*to select type */}
            <p className="text-xl font-bold">Type</p>
            <div className="w-full border-2 cursor-pointer mb-5 rounded-md border-gray-400">
              <Multiselect
                options={types}
                displayValue={"name"}
                selectedValues={[types[0]]}
                singleSelect={true}
                placeholder={"Type"}
                customCloseIcon={EmptyImg}
                onSearch={(selectedValue) => {
                  setType(selectedValue);
                }}
                style={{
                  searchBox: {
                    paddingTop: "10px",
                    border: "none",
                    fontSize: "20px",
                    minHeight: "50px",
                  },
                  optionContainer: {
                    backgroundColor: colors.headerFooter,
                  },
                  option: {
                    fontSize: "20px",
                    color: colors.textColor,
                    hoverColor: "red",
                  },
                  chips: {
                    fontSize: "20px",
                    background: "none",
                  },
                }}
              />
            </div>

            {/*for other details */}
            <form className="space-y-5" id="goalForm" onSubmit={AddGoal}>
              <div>
                <label htmlFor="title" className="text-xl font-bold">
                  Title
                </label>
                <input
                  name="title"
                  id="title"
                  className="w-full text-lg p-2 border-2 border-gray-400 font-semibold focus:border-gray-700 focus:outline-none bg-opacity-5 rounded-md"
                  onChange={(e) => onChange(e)}
                  required={true}
                  minLength={10}
                  maxLength={30}
                  style={{ backgroundColor: colors.bg }}
                ></input>
              </div>
              <div>
                <label htmlFor="desc" className="text-xl font-bold">
                  Description
                </label>
                <textarea
                  name="desc"
                  id="desc"
                  className="w-full text-lg p-2 border-2 border-gray-400 rounded-md font-semibold resize-none h-24 focus:border-gray-700 focus:outline-none bg-opacity-5"
                  onChange={(e) => onChange(e)}
                  required={true}
                  minLength={30}
                  maxLength={100}
                  style={{ backgroundColor: colors.bg }}
                ></textarea>
              </div>
              <div>
                <label htmlFor="progress" className="text-xl font-bold">
                  Initial Progress
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type={"range"}
                    id={"progress"}
                    min={0}
                    max={99}
                    defaultValue={0}
                    step={1}
                    className="w-full"
                    onChange={(e) => setProgress(e.target.valueAsNumber)}
                  ></input>
                  <div className="text-2xl font-bold pb-1">{progress}</div>
                </div>
              </div>
              <div className="flex space-x-3 w-full justify-center items-center">
                <button
                  className="w-24 bg-green-500 text-lg font-semibold text-white py-2 rounded-md shadow-md"
                  type="submit"
                  value={"Add"}
                >
                  Add
                </button>
                <button
                  onClick={() => props.setTrigger(false)}
                  className="w-24 bg-red-500 text-lg font-semibold text-white py-2 rounded-md shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddGoal;
