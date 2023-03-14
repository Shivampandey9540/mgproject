import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

function AddTodo({ Fetch }) {
  const [Title, setTitle] = useState("");
  const [Tasks_holder, setTask_holder] = useState("");
  const [Fav, setFav] = useState(false);
  const URL = process.env.REACT_APP_URL;

  const backendrequest = async (task) => {
    try {
      const data = await axios.post(`${URL}Creates`, {
        Title: Title,
        Tasks: task,
        isimportant: Fav,
      });
      console.log(data);
      if (data.data.Success === true) {
        Fetch();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.Success === false) {
        toast.error(error.response.data.Error);
      }
    }

    setTitle("");
    setTask_holder("");
    setFav(false);
  };
  const Handlesubmit = (e) => {
    e.preventDefault();
    if (Tasks_holder === "" || Title === "") {
      return toast.error(
        `Ahh,Check The Requiremnt Tasks: ${!!Tasks_holder}
        Title: ${!!Title}`
      );
    }
    Tasks_holder.trim();
    console.log(Tasks_holder);
    const Arr = Tasks_holder.split(",");
    console.log(Arr);
    const tasks = [];
    for (let i = 0; i < Arr.length; i++) {
      tasks.push({ task: Arr[i] });
    }
    backendrequest(tasks);
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        {/* <!-- text - start --> */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Todo Here
          </h2>
        </div>
        {/* <!-- text - end -->

    <!-- form - start --> */}
        <form
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
          onSubmit={Handlesubmit}
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="Title"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Title
            </label>
            <input
              name="Title"
              value={Title}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="Task"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Message*
            </label>
            <textarea
              name="Task"
              value={Tasks_holder}
              onChange={(e) => {
                setTask_holder(e.currentTarget.value);
              }}
              className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            ></textarea>
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(Fav);
                setFav(!Fav);
                console.log(Fav);
              }}
              type="button"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              {Fav ? "Remove Favourtie" : "Add favourite"}
            </button>

            <button
              type="submit"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Send
            </button>

            <span className="text-gray-500 text-sm">
              Please add (, comma ) for different Task
            </span>
          </div>
        </form>
        {/* <!-- form - end --> */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddTodo;
