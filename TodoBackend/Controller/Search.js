const Todo = require("../model/TodoSchema");
const mongoose = require("mongoose");

const Search = async (req, res) => {
  const str = req.params.str;
  console.log(str);
  if (!str) {
    res.status(401).json({
      Success: false,
      Message: "String is not passed",
    });
  }

  try {
    const data = await Todo.find({
      /**
       *  this Or statment is for checking fo Title and
       *  task and without any case sensetivite
       *  got this form  stack over flow and mongoodb docks combined
       */
      $or: [
        { Title: { $regex: `^${str}`, $options: "i" } },
        { "tasks.task": { $regex: `^${str}`, $options: "i" } },
      ],
    });
    console.log(data);
    if (data.length == 0) {
      return res.status(401).json({
        Success: false,
        Message: "data is not found",
      });
    }

    console.log(data);
    res.status(200).json({
      Success: true,
      message: "datahas been found",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      Success: false,
      message: "Erore",
    });
  }
};

module.exports = { Search };
