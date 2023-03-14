const express = require("express");
const { ADDTodo, ChangeTodo, ChangeTitle } = require("../Controller/EditTodo");
const { CreatedTodo, CreateTask } = require("../Controller/createTask");
const { gettingTodos, getTodo } = require("../Controller/gettingTodos");
const { DeleteTasks, DeleteOneTask } = require("../Controller/deleteTask");

const Sorted = require("../Controller/SortedbyDate");
const { MarkCheck } = require("../Controller/CheckMark");

const { MarkImportant } = require("../Controller/MarkImportant");

const { Search } = require("../Controller/Search");

const { Searching, Createcompany } = require("../Controller/product");
const { Signup, Login, Profile } = require("../Controller/auth/Auth");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).json({
    Message: "Hello, Visiter thankyou for using this structure",
  });
});

//Create single task
route.post("/Create", CreatedTodo);

route.get("/GetTodos", gettingTodos);
route.get("/GetTodo/:id", getTodo);

route.put("/Add_Task/:Title_id", ADDTodo);
route.put("/ChangeTitle/:Title_id", ChangeTitle);
route.put("/Change_Todo/:Title_id/:Task_id", ChangeTodo);

route.delete("/DeleteTasks/:Title_id", DeleteTasks);
route.delete("/DeletetaTask/:Title_id/:Task_id", DeleteOneTask);

/** work in progress */

//create multiple task at once
route.post("/Creates", CreateTask);

route.put("/CheckMark/:Title_id", MarkCheck);
route.put("/MarkImportant/:Title_id", MarkImportant);

route.get("/Search/:str", Search);

route.get("/Sorted", Sorted);
route.get("/company/:str", Searching);
route.post("/companycreate", Createcompany);

route.post("/signup", Signup);
route.post("/Login", Login);
route.post("/profile", Profile);
module.exports = route;
