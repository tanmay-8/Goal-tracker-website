const mongoose = require("mongoose");

//database url
const mongoURL =
  "mongodb://localhost:27017/completeYourGoal?directConnection=true&readPreference=primaryPreferred";

//connecting to mongodb database
connectToMongo = () => {
  mongoose.connect(
    mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected");
      }
    }
  );
};
module.exports = connectToMongo;
