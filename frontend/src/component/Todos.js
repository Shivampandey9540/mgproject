import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import Context from "../Context/Context";
const Todos = () => {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const [Search, setSearch] = useState("");

  useEffect(() => {}, [state]);

  const SearchtheString = async () => {
    Search.trim();

    navigate(`/Home/Search/${Search}`, {
      state: { Search },
    });
    setSearch("");
  };
  const HandleSearch = (e) => {
    e.preventDefault();
    if (Search.length === 0) {
      return null;
    }
    SearchtheString();
  };
  return (
    <div>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
          <h1 className="text-3xl font-bold leading-none text-center sm:text-4xl">
            All Todo's are Here
          </h1>
          <div className="relative mt-6 mb-12">
            <form onSubmit={HandleSearch}>
              <span className="absolute inset-y-0 flex items-center pl-2 mx-auto">
                <button
                  type="submit"
                  title="Search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 dark:text-gray-100"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                placeholder="Search..."
                value={Search}
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.currentTarget.value);
                }}
                className="w-full py-3 pl-12 text-sm rounded-full sm:w-96 focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
              />
            </form>
          </div>
          <div className="grid md:grid-cols-3 gap-[20px] lg:gap-[30px]  w-full divide-y sm:grid-cosl-2 sm:divide-y-0 sm:divide-x sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
            {state.length === 0 ? (
              <div>
                <details>
                  <summary className="py-2 outline-none cursor-pointer focus:underline">
                    Todo's avilable
                  </summary>
                  <div className="px-4 pb-4">
                    <div>
                      <p>There are no element's to show</p>
                    </div>
                  </div>
                </details>
              </div>
            ) : (
              state.map((e) => {
                return (
                  <div key={e._id} className="grid justify-center items-center">
                    <Link to={`/Home/Todo/${e._id}`}>{e.Title}</Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <Outlet />

      <ToastContainer />
    </div>
  );
};

export default Todos;
