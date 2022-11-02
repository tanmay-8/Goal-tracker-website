const express = require("express");
const router = express.Router();
const Goal = require("../Models/Goal");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../Middlewares/fetchuser");

//to add goal
router.post(
  "/addGoal",
  [
    body("title", "Enter valid title").isLength({ min: 10, max: 30 }),
    body("desc", "Enter valid description").isLength({ min: 30, max: 100 }),
    body("type", "Enter valid title").exists(),
    body("color_scheme", "Enter valid color scheme").isObject(),
    body("initProgress", "Enter valid progress").isNumeric(),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const { title, desc, type, initProgress, color_scheme } = req.body;
      //if errors then show
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors, success });
      }

      const goal = new Goal({
        user: req.user.id,
        title: title,
        desc: desc,
        type: type,
        initProgress: initProgress,
        nowprogress: initProgress,
        color_scheme: color_scheme,
      });

      const saved_goal = await goal.save();

      success = true;
      res.json({ saved_goal, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/getgoals", fetchuser, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/getgoal/:id", fetchuser, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.json(goal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/deletegoal/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(400).send({ error: "Not Found", success });
    }
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    goal = await Goal.findByIdAndDelete(req.params.id);
    success = true;
    res.send({ goal: goal, sucsses: "goal deleted", success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.put(
  "/addlog/:id",
  fetchuser,
  [
    body("desc", "Enter valid description").exists(),
    body("increasedBy", "Tell increased by").isNumeric(),
  ],
  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors, success });
      }

      let goal = await Goal.findById(req.params.id);
      if (!goal) {
        console.log("Not found");
        res.send("Not Found");
      }

      const { desc, increasedBy } = req.body;

      //updating progress
      let progressNow = parseInt(goal.nowprogress) + parseInt(increasedBy);
      let addedOn = new Date(goal.date);
      let today = new Date(Date.now());

      let daysPassed = Math.ceil(
        (today.getTime() - addedOn.getTime()) / (24 * 60 * 60 * 1000)
      );
      //upadating daily progress
      let daily_progress = (progressNow - goal.initProgress) / daysPassed;

      const log = {
        desc: desc,
        increasedBy: increasedBy,
        progressNow: progressNow,
      };

      //updating logs
      const logs = goal.logs.concat(log);
      let newGoal = {
        nowprogress: progressNow,
        daily_progress: daily_progress,
        logs: logs,
      };

      let updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        { $set: newGoal },
        { new: false }
      );
      res.send({ updatedGoal, success });
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  }
);

module.exports = router;
