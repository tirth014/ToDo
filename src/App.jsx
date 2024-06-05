import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (e, id) => {
    let todo = todos.filter(i => i.id === id);
    setTodo(todo[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
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
            className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-5 text-white"
          >
            Add
          </button>
        </div>

        <h1 className="text-xl font-bold">Your ToDo List</h1>
        <div className="todos">
          {todos.length === 0 && <div>No todos!</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo my-3 flex w-1/2 justify-between"
              >
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  value={item.isCompleted}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => {handleEdit(e, item.id)}}
                    className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-700 hover:bg-violet-800 p-3 py-1 rounded-lg mx-2 text-white"
                  >
                    Delete
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
