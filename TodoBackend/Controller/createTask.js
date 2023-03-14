const Todo = require("../model/TodoSchema");
/**
 *
 * @param {Title, Task} req.body it has the  Title id for Searching--
 * @param {200} res response is a json with Success,
 * Message and data which has been created---
 *
 * @condition Deponeding on condition we are
 * able to send different data----
 *         - When title_ id is not Available ( without Task A todo can exists)--
 *         - when data with same Title  already exist in database ( error.index == 0)--
 *         - when data is required and it' not passed through information--
 *
 * @returns
 */
const CreatedTodo = async (req, res) => {
  const { Title, Task } = req.body;

  if (!Title) {
    return res.status(400).json({
      Success: false,
      Message: "data is unefficient for this process",
      Title: !!Title,
    });
  }

  try {
    //trying to create new Data here
    const CreatedTodo = await Todo.create({
      Title: Title,
      tasks: [{ task: Task }],
    });

    res.status(200).json({
      Success: true,
      Message: "Todo has been Created",
      Todo: CreatedTodo,
    });
  } catch (error) {
    // duplication of data with same title
    console.log(error);
    if (error.index == 0) {
      return res.status(401).json({
        success: false,
        Error: "A Todo with Same Title already Exist change the title",
      });
    }
    // Title has been not pass
    else if (error.errors.Title.kind === "required") {
      return res.status(400).json({
        success: false,
        Error: "Title is required Here or it cannot be same as other",
      });
    }
    // Handling some other Error by this
    res.status(402).json({
      success: false,
      Error: "some Error has been occured Please try Again Later",
    });
  }
};

/**
 *
 * @param {Title, Tasks, isimportant} req.body it has the  Title id for Searching--
 * @param {200} res response is a json with Success,
 * Message and data which has been created---
 *
 * @condition Deponeding on condition we are
 * able to send different data Error ----
 *         - When title_ id is not Available ( without Task A todo can exists)
 *         - when data with same Title  already exist in database ( error.index == 0)
 *         - when data is required and it' not passed through information
 *
 * @returns
 */

/**Work in progres */
const CreateTask = async (req, res) => {
  const { Title, Tasks, isimportant } = req.body;

  if (!(Title && Tasks)) {
    return res.status(400).json({
      Success: false,
      Message: "data is unefficient for this process",
      Title: !!Title,
      Tasks: !!Tasks,
    });
  }

  try {
    //trying to create new Data here
    const CreatedTodo = await Todo.create({
      Title: Title,
      tasks: Tasks,
      isimportant: isimportant,
    });

    res.status(200).json({
      Success: true,
      Message: "Todo has been Created",
      Todo: CreatedTodo,
    });
  } catch (error) {
    // duplication of data with same title
    console.log(error);

    if (error.index == 0) {
      return res.status(401).json({
        Success: false,
        Error: "A Todo with Same Title already Exist change the title",
      });
    }
    // Title has been not pass
    else if (error.errors.Title.kind === "required") {
      return res.status(400).json({
        Success: false,
        Error: "Title is required Here or it cannot be same as other",
      });
    }
    // Handling some other Error by this
    res.status(402).json({
      Success: false,
      Error: "some Error has been occured Please try Again Later",
    });
  }
};

module.exports = { CreatedTodo, CreateTask };
