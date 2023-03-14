import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { REMOVETODOS, REMOVETASK } from "../Context/action.type";
import Context from "../Context/Context";

function Search({ Fetch }) {
  const URL = process.env.REACT_APP_URL;
  const { String } = useParams();
  const { state, dispatch } = useContext(Context);
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [change, setChange] = useState(false);
  console.log(location);
  const SearchString = location.state.Search;

  const Search = async () => {
    try {
      const datastore = await axios.get(`${URL}Search/${SearchString}`);
      console.log(datastore.data.data);
      setData(datastore.data.data);
    } catch (error) {
      toast.error(error.response.data.Message);
      console.log(error);
    }
  };
  const CheckMarkImportant = async (id) => {
    try {
      const data = await axios.put(`${URL}MarkImportant/${id}`);
      console.log(data.response);
      Fetch();
      Search();
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
    if (!SearchString) {
      navigate("/");
    }
    Search();
  }, [SearchString, change]);

  return (
    <div>
      {Data.map((e) => {
        return (
          <div key={e._id} className="pt-[2rem]">
            {e.isimportant === true ? (
              <div>
                <div className="bg-white pb-[1rem] sm:pb-[2rem] lg:pb-[3rem]">
                  <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg gap-4 p-4 md:p-8">
                      <div className="w-[70%] ">
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
                                    </button>{" "}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </details>
                      </div>

                      <div className="flex gap-[30px]">
                        <div
                          onClick={() => {
                            navigate(`/Edited`, {
                              state: { _id: e._id, type: "Title" },
                            });
                          }}
                        >
                          {" "}
                          <span>
                            {" "}
                            <BsFillPencilFill />
                          </span>
                        </div>{" "}
                        <div
                          onClick={() => {
                            CheckMarkImportant(e._id);
                          }}
                        >
                          <span>
                            {e.isimportant === true ? (
                              <AiFillStar />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div key={e._id} className="pt-[2rem]">
                  <div className="bg-white pb-[1rem] sm:pb-[2rem] lg:pb-[3rem]">
                    <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg gap-4 p-4 md:p-8">
                        <div className="w-[70%] ">
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
                                  <div className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
                                    <p className=" testing">{k.task}</p>
                                  </div>
                                  <div className="flex items-center gap-[10px]">
                                    <div
                                      className="flex gap-[30px]"
                                      onClick={() => {
                                        navigate(`/Edited`, {
                                          state: {
                                            _id: k._id,
                                            Titleid: e._id,
                                            type: "Task",
                                          },
                                        });
                                      }}
                                    >
                                      {" "}
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
                        <div
                          className="flex gap-[30px]"
                          onClick={() => {
                            navigate(`/Edited`, {
                              state: { _id: e._id, type: "Title" },
                            });
                          }}
                        >
                          {" "}
                          <span>
                            {" "}
                            <BsFillPencilFill />
                          </span>
                          <div
                            onClick={() => {
                              CheckMarkImportant(e._id);
                            }}
                          >
                            <span>
                              {e.isimportant === true ? (
                                <AiFillStar />
                              ) : (
                                <AiOutlineStar />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* <Outlet /> */}
      "
      <ToastContainer />
    </div>
  );
}

export default Search;
