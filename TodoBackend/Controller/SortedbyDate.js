const Todo = require("../model/TodoSchema");

const Sorted = async (req, res) => {
  try {
    //for new to  old
    const data = await Todo.find().sort({ CreatedDate: -1 });
    //for old to new
    // const data = await Todo.find().sort({ CreatedDate: 0 });
    console.log(data);
    res.status(200).json({
      Success: true,
      Message: "Data given as the full object",
      data: data,
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
module.exports = Sorted;
