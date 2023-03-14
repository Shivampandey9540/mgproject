import Todos from "./component/Todos";
import AddTodo from "./component/AddTodo";
import { useEffect } from "react";

const Home = ({ Fetch }) => {
  useEffect(() => {});
  return (
    <div>
      <AddTodo Fetch={Fetch} />
      <Todos />
    </div>
  );
};

export default Home;
