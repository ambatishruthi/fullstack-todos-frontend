import { useEffect, useState } from 'react';
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateTodo,deleteTodo } from './utils/HandleApi';

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentId, setCurrentId] = useState(null); // Correct state for storing the current ID

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setCurrentId(_id); // Store the ID in the correct state
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TODO APPLICATION</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add Todo.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () => updateTodo(currentId, text, setToDo, setText, setIsUpdating) // Use currentId here
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={()=>deleteTodo(item._id,setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
