import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const toggleFinished = (e) =>{
    setShowFinished(!showFinished);
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleEdit = (e, id) => {
    let todo = todos.filter((i) => i.id === id);
    setTodo(todo[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-500 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a ToDo</h2>
          <input
            type="text"
            className="w-80"
            onChange={handleChange}
            value={todo}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=3}
            className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-5 text-white"
          >
            Add
          </button>
          <input type="checkbox" checked={showFinished} onChange={toggleFinished}/> Show Finished
        </div>

        <h1 className="text-xl font-bold">Your ToDo List</h1>
        <div className="todos">
          {todos.length === 0 && <div>No todos!</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo my-3 flex w-1/2 justify-between"
              >
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-2 text-white"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-2 text-white"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
