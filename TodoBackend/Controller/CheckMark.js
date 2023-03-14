const Todo = require("../model/TodoSchema");
const mongoose = require("mongoose");
/**
 *
 * @param {Title_id} req.params it has the  Title id for Searching--
 * @param {200} res response is a json with Success
 * Message and data which has been marked out ---
 *
 * @condition Deponeding on condition we are
 * able to send different data----
 *         - When title_ id is not Available
 *         - when passed title_id is  no a valid objectId
 *         - When data is not Avilable
 *
 * @returns
 */

const MarkCheck = async (req, res) => {
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
    MarkedDone.Check = !MarkedDone.Check;
    MarkedDone.save();

    res.status(200).json({
      Success: false,
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

module.exports = { MarkCheck };
