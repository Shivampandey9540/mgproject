const Todos = require("../model/TodoSchema");
const mongoose = require("mongoose");

const ADDTodo = async (req, res) => {
  const { Title_id } = req.params;

  if (!Title_id) {
    return res.status(401).json({
      Success: false,
      Message: "data is unefficient for this process",
      Title: !!Title_id,
    });
  } else if (!mongoose.Types.ObjectId.isValid(Title_id)) {
    return res.status(402).json({
      success: false,
      message: "TitleId is not Valid Please Check you id and try again",
      TitleId: mongoose.Types.ObjectId.isValid(Title_id),
    });
  }

  try {
    const Data_got = await Todos.findById({ _id: Title_id });

    if (!Data_got) {
      return res
        .status(404)
        .json({ Success: false, Message: " no Such a data is avaliable" });
    }
    const { NewTask } = req.body;

    if (!NewTask) {
      return res.status(405).json({
        Succes: false,
        Message:
          "No data has been passed on with NewTask Please Pass the data here",
      });
    }
    Data_got.tasks = [...Data_got.tasks, { task: NewTask }];
    console.log(Data_got.tasks);
    Data_got.save();

    res.status(200).json({
      Succes: true,
      message: "you are here",
      Task: NewTask,
      NewTask: Data_got,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Success: false, Message: "error", Error: error });
  }
};

const ChangeTitle = async (req, res) => {
  const { Title_id } = req.params;
  if (!Title_id) {
    return res.status(401).json({
      Success: false,
      Message: "data is unefficient for this process",
      Title: !!Title_id,
    });
  } else if (!mongoose.Types.ObjectId.isValid(Title_id)) {
    return res.status(402).json({
      success: false,
      message: "TitleId is not Valid Please Check you id and try again",
      TitleId: mongoose.Types.ObjectId.isValid(Title_id),
    });
  }

  try {
    const Data_got = await Todos.findById({ _id: Title_id });

    if (!Data_got) {
      return res
        .status(404)
        .json({ Success: false, Message: " no Such a data is avaliable" });
    }
    const { changeTitle } = req.body;

    if (!changeTitle) {
      return res.status(405).json({
        Succes: false,
        Message:
          "No data has been passed on with ChangeTitle Please Pass the data here",
      });
    }
    const CheckforTitle = await Todos.find({ Title: changeTitle });

    console.log(CheckforTitle);
    if (CheckforTitle.length != 0) {
      return res.status(403).json({
        Success: false,
        message: "You can't use this title it's already in use ",
        Title: changeTitle,
      });
    }

    Data_got.Title = changeTitle;
    console.log(Data_got);
    Data_got.save();

    // res.status(200).json({
    //   Succes: true,
    //   message: "you are here",
    //   Task: NewTask,
    //   NewTask: Data_got,
    // });
    res.status(200).json({ Success: true, Message: "change the title" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Success: false, Message: "error", Error: error });
  }
};

const ChangeTodo = async (req, res) => {
  const { Title_id, Task_id } = req.params;
  const { changeTask } = req.body;

  if (!(Title_id && Task_id && changeTask)) {
    return res.status(401).json({
      Success: false,
      Message: "data is not sufficient for this please check Missing section",
      Missing: { Titleid: !!Title_id, Taskid: !!Task_id, Change: !!changeTask },
    });
  } else if (
    !(
      mongoose.Types.ObjectId.isValid(Task_id) &&
      mongoose.Types.ObjectId.isValid(Title_id)
    )
  ) {
    return res.status(402).json({
      Success: false,
      Message: "Passed id is not a ObjectId, Please pass the Valid id ",
      TitleId: mongoose.Types.ObjectId.isValid(Title_id),
      TaskId: mongoose.Types.ObjectId.isValid(Task_id),
    });
  }
  try {
    const data = await Todos.findById({
      _id: Title_id,
    });

    if (!data) {
      return res.status(400).json({
        Success: false,
        Message: "Data is not available with this Id",
      });
    }

    data.tasks = data.tasks.filter((e) => {
      if (e._id == Task_id) {
        e.task = changeTask;
      }
      return e;
    });

    data.save();

    // console.log(data);
    res.status(200).json({ Success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(403).json({ Success: false, Error: error });
  }
};

module.exports = { ADDTodo, ChangeTodo, ChangeTitle };
