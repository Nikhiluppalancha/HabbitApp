const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const Habit = require("./Model/habit");
const port = 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://mernecommerce1997:mernecommerce1997@cluster0.twlnrlj.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to mango DB");
  })
  .catch((error) => {
    console.log("Error Connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server running on the port : 3000");
});

//Creating the records and endpoint

app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;
    const newHabit = new Habit({
      color,
      title,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json({ savedHabit });
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
});

app.get("/hello", async (req, res) => {
  try {
  res.send('hello')
  } catch (error) {
    res.send('error')
  }
});

app.get("/habitslist", async (req, res) => {
  try {
   const allhabits = await Habit.find({})

   res.status(200).json(allhabits)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/habits/:habitId/completed/:day",async (req, res) => {
  try {
     const{habitId,day} = req.params;

     const habit = await Habit.findById(habitId);

     if(!habit){
      return res.status(404).json({error:"habit not found"})
     }

     habit.completed[day] = true;

     await habit.save();
      
     res.status(200).json({message:"Habit completion status updated."})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


