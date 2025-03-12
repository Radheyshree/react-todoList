import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoListHeader from "./components/TodoListHeader.js";
import TodoItems from "./components/TodoItemList.js";

export default function App() {
  return (
    <div className="App">
      <TodoListHeader>
        <TodoItems />
      </TodoListHeader>
    </div>
  );
}
