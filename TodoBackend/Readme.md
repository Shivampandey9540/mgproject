## Todo App Backend

> This App Created using Node.js and express dotenv mongoose in this application we can Create Todo's by using Title, which Link is given down (live link)
> [CreateTodo](https://todoappshivampandey.herokuapp.com/Create)

> you can Get those Todo as A whole or as a part in This applicaiton
> [Whole](https://todoappshivampandey.herokuapp.com/GetTodos)
> (https://todoappshivampandey.herokuapp.com/GetTodo/:id) Id should be given in url if you know put up there

> And there is alot of thing such as Changing Title name, changing Task and Delete a specific task,

> And if you have Completed such Task you can delete the whole todo or the Specific Task in it

## Links

  <h3> Base url</h3>
  (https://todoappshivampandey.herokuapp.com)

Adding Todo

    - /Create
     ## with
    {
    "Title": "String",
    "Task": "String"
     }

Getting All the Todos

    - /GetTodos

Getting Spcific Todo

     - /GetTodo/:id
    ( id Should be Title_id)

Adding more Task init

    - /Add_Task/:Title_id
     ## with
     {
         "NewTask": "String"
     }-

changing title Name

     - /Changetitle/:Title_id
      {
        "changeTitle": "String"
      } -

Change Task inside Todo

     -/Change_Todo/:Title_id/:Task_id
      {
        "changeTask": "String"
      }-

Delete the Whole Task

     - /DeleteTasks/:Title_id

Delete the Task inside the Todo

     - /DeleteTask/:Title_id/:Task_id
