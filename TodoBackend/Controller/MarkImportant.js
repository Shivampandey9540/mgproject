const Todo = require("../model/TodoSchema");
const mongoose = require("mongoose");
const MarkImportant = async (req, res) => {
  const { Title_id } = req.params;
  if (!Title_id) {
    return res.status(400).json({
      Success: false,
      Message: "Title id should be passed on",
      Title_id: !!Title_id,
    });
  } else if (!mongoose.Types.ObjectId.isValid(Title_id)) {
    return res.status(401).json({
      Success: false,
      Message: "Title id is not a valid Object Id",
      Title_id: mongoose.Types.ObjectId.isValid(Title_id),
    });
  }

  try {
    const MarkedDone = await Todo.findById({ _id: Title_id });
    if (!MarkedDone) {
      return res.status(403).json({
        Success: false,
        Message: "NO Data is available with this Id",
        _id: Title_id,
      });
    }
    MarkedDone.isimportant = !MarkedDone.isimportant;
    MarkedDone.save();

    res.status(200).json({
      Success: true,
      Message: "It has been checked",
      MarkedDone,
    });
  } catch (error) {
    res.status(404).json({
      Success: false,
      Messsage: "some Error has been occured",
      error: error,
    });
  }
};

module.exports = { MarkImportant };
