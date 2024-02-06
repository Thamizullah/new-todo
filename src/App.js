import { useEffect, useState } from "react";
import Todo from "./components/todo";
import {
  addtodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from "./utilis/HandleApi";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [todoId, settodoId] = useState("");

  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

  const updateMode = (_id, text) => {
    setisupdating(true);
    setText(text);
    settodoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isupdating
                ? () =>
                    updateTodo(todoId, text, setTodo, setText, setisupdating)
                : () => addtodo(text, setText, setTodo)
            }
          >
            {isupdating ? "update" : "Add"}
          </div>
        </div>
        {/* <div className="list">
          <Todo text="hi"></Todo>
          <Todo text="hi"></Todo>
          <Todo text="hi"></Todo>
        </div> */}
        <div className="list">
          {todo.map((item) => (
            <Todo
              key={item._id}
              text={item.text}
              deleteTodo={() => deleteTodo(item._id, setTodo)}
              updateMode={() => updateMode(item._id, item.text)}
            />
          ))}
        </div>
        <div className="list">
          <Todo text="Tomorrow Project Sumisson"></Todo>
          <Todo text="coming thursday HR Interview"></Todo>
          <Todo text="coming Friday Mock Interview"></Todo>
        </div>
      </div>
    </div>
  );
}

export default App;
