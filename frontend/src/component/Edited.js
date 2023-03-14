import { useLocation } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import axios from "axios";
import Context from "../Context/Context";
const EditTodo = ({ Fetch }) => {
  const [change, setChange] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;
  const { type } = location.state;
  console.log(type, location.state._id);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Title") {
      const Title_id = location.state._id;
      console.log(Title_id, "Title");
      try {
        const DataResponse = await axios.put(`${URL}ChangeTitle/${Title_id}`, {
          changeTitle: change,
        });
        console.log(DataResponse);
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Task") {
      const { _id, Titleid } = location.state;
      console.log(_id, "Task", Titleid, location.state);
      const DataResponse = await axios.put(
        `${URL}Change_Todo/${Titleid}/${_id}`,
        {
          changeTask: change,
        }
      );
    }
    navigate(-1);
    Fetch();
  };
  return (
    <div className="absolute backdrop-blur-md flex items-center justify-center top-[0px] h-[100vh] z-[999] w-[99vw]">
      <div className=" bg-[black] text-white w-[50%] h-[50%] rounded-xl flex flex-col items-center justify-center">
        <div
          className="w-[100%] flex h-[10%] items-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          <span className="text-3xl">
            <IoIosArrowBack color="white" />
          </span>
        </div>

        <div className="h-[70%]">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter the Change you want</span>
              <span className="label-text-alt"></span>
            </label>
            <form
              className="flex items-center gap-[10px] justify-center"
              onSubmit={(e) => {
                HandleSubmit(e);
              }}
            >
              <input
                type="text"
                placeholder="Type here"
                value={change}
                onChange={(e) => {
                  setChange(e.currentTarget.value);
                }}
                className="input input-bordered w-full max-w-xs h-[35px]  bg-[transparent] border-[1px] text-center rounded-xl"
              />
              <button
                type="submit"
                className="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
