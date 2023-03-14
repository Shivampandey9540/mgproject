import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Context from "../Context/Context";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { REMOVETODOS, REMOVETASK } from "../Context/action.type";
const SpecTodo = ({ fetch }) => {
  const URL = process.env.REACT_APP_URL;
  const [SpecTodo, setSpecTodo] = useState([]);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const [change, setChange] = useState(false);
  const { id } = useParams();

  const CheckMarkImportant = async (id) => {
    try {
      const data = await axios.put(`${URL}MarkImportant/${id}`);
      console.log(data.data);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.Message);
      console.log(error);
    }
  };
  const Delete = async (type, title_id, Task_id) => {
    console.log(title_id, Task_id);
    if (type === "Task") {
      try {
        const data = await axios.delete(
          `${URL}DeletetaTask/${title_id}/${Task_id}`
        );
        console.log(data.data);
        dispatch({
          type: REMOVETASK,
          _id: Task_id,
        });
        console.log(state);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data.Message);
        console.log(error);
      }
    } else if (type === "Title") {
      try {
        const data = await axios.delete(`${URL}DeleteTasks/${title_id}`);
        console.log(data.data);
        dispatch({
          type: REMOVETODOS,
          _id: title_id,
        });
        console.log(state);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data.Message);
        console.log(error);
      }
    }
    setChange(!change);
  };

  useEffect(() => {
    setSpecTodo(
      state.filter((e) => {
        return e._id === id;
      })
    );
  }, [id, state, change]);
  // useEffect(() => {}, [state]);
  return (
    <div>
      {SpecTodo.length === 0 ? (
        <div>
          {" "}
          <span>No Data is avilable</span>
        </div>
      ) : (
        <div>
          {SpecTodo.map((e) => {
            return (
              <div key={e._id} className="pt-[2rem]">
                <div className="bg-white pb-[1rem] sm:pb-[2rem] lg:pb-[3rem]">
                  <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg gap-4 p-4 md:p-8">
                      <div className="w-[70%]">
                        <h2 className="text-indigo-500 text-xl md:text-2xl font-bold">
                          {e.Title}
                        </h2>
                        <details className="w-full border rounded-lg">
                          {e.tasks.map((k) => {
                            return (
                              <div
                                key={k._id}
                                className="flex items-center justify-around"
                              >
                                {" "}
                                <div className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
                                  <p className=" testing">{k.task}</p>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                  <div
                                    onClick={() => {
                                      console.log(k, "Check me here");
                                      navigate(`/Edited`, {
                                        state: {
                                          _id: k._id,
                                          Titleid: e._id,
                                          type: "Task",
                                        },
                                      });
                                    }}
                                  >
                                    <BsFillPencilFill />
                                  </div>

                                  <div>
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        console.log("heelo");
                                        Delete("Task", e._id, k._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </details>
                      </div>

                      <div className="flex gap-[30px]">
                        {" "}
                        <div className="flex items-center gap-[10px]">
                          <div
                            onClick={() => {
                              navigate(`/Edited`, {
                                state: {
                                  _id: e._id,
                                  type: "Title",
                                },
                              });
                            }}
                          >
                            <BsFillPencilFill />
                          </div>

                          <div>
                            <button
                              className="btn"
                              onClick={() => {
                                console.log("heelo");
                                Delete("Title", e._id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            let newArry = [...SpecTodo];
                            newArry[0].isimportant = !newArry[0].isimportant;
                            setSpecTodo([...newArry]);
                            CheckMarkImportant(e._id);
                          }}
                        >
                          {" "}
                          <span>
                            {e.isimportant === true ? (
                              <AiFillStar />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>
      )}
      <ToastContainer />
      <button
        onClick={() => {
          console.log(state);
        }}
      >
        click me
      </button>
    </div>
  );
};

export default SpecTodo;
