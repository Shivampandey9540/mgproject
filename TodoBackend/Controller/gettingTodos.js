const Todos = require("../model/TodoSchema");
const mongoose = require("mongoose");
const gettingTodos = async (req, res) => {
  try {
    const Todos_data = await Todos.find();
    console.log(Todos_data);
    res.status(200).json({
      Success: true,
      Message: "Data given as the full object",
      data: Todos_data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      Success: false,
      Message: "Some error has been accured",
      Error: error,
    });
  }
};
const getTodo = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({
      success: false,
      Message: "Passed id is not a ObjectId, Please pass the Valid id ",
      Titleid: mongoose.Types.ObjectId.isValid(id),
    });
  }
  try {
    const TodoAvaliable = await Todos.findById({ _id: id });

    /**
     *
     * *({or:[ {tittle: new RegExp(search, "i")}, {tasks: new RegExp(search: "i")}]})
     *
     */
    if (!TodoAvaliable) {
      return res.status(402).json({
        success: false,
        Message: "No Data is available for this path",
      });
    }
    res.status(200).json({
      success: true,
      Message: "Data found and deliverd",
      data: TodoAvaliable,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      Message: "Some error has been accured",
      Error: error,
    });
  }
};

module.exports = { gettingTodos, getTodo };
