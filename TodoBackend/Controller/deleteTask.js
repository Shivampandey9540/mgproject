const Todos = require("../model/TodoSchema");
const mongoose = require("mongoose");
/**
 *
 * @param {Title_id} req.params  it's hold Id so we can Delete only
 *  required Data or nothing else ---
 *
 * @param {*} res
 * @returns
 */
const DeleteTasks = async (req, res) => {
  const { Title_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Title_id)) {
    return res.status(400).json({
      success: false,
      Message: "Passed id is not a ObjectId, Please pass the Valid id ",
    });
  }
  try {
    const data = await Todos.findByIdAndDelete({ _id: Title_id });

    if (!data) {
      console.log("we have been failed");
      return res.status(200).json({
        success: false,
        Message: "No data is available with this Id",
      });
    }
    res.status(200).json({
      success: true,
      Message: "Data has been deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({ Success: false, Error: error });
  }
};

const DeleteOneTask = async (req, res) => {
  const { Title_id, Task_id } = req.params;
  if (!(Title_id && Task_id)) {
    return res.status(401).json({
      Success: false,
      Message: "TitleId or TaskId is not Pass through Please validate the url",
      Titleid: !!Title_id,
      TaskId: !!Task_id,
    });
  } else if (
    !(
      mongoose.Types.ObjectId.isValid(Title_id) &&
      mongoose.Types.ObjectId.isValid(Task_id)
    )
  ) {
    return res.status(402).json({
      Success: false,
      Message: "titleId or TaskId is not A valid Please check the id",
      Titleid: mongoose.Types.ObjectId.isValid(Title_id),
      TaskId: mongoose.Types.ObjectId.isValid(Task_id),
    });
  }
  try {
    const data = await Todos.find({
      _id: Title_id,
    });
    console.log(data, "helo");

    if (data.length == 0) {
      return res.status(404).json({
        Success: false,
        Message: "Data is not available with this Id",
      });
    }

    data[0].tasks = data[0].tasks.filter((e) => {
      return e._id != Task_id;
    });
    console.log(data);

    data[0].save();

    res.status(200).json({
      Success: true,
      Message: "data has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      Success: false,
      Message: "some Error has been accured",
      Error: error,
    });
  }
};
module.exports = { DeleteTasks, DeleteOneTask };
