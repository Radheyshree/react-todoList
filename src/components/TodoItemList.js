import "../styles.css";
import AddTodo from "./AddTodo.js";
import TodoFooter from "./TodoFooter.js";
import Todo from "./Todo.js";
import { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
//import {stringify} from "flatted";

function TodoItems({ onTodoChange, onTodoSubmit }) {
  const [todo, setTodo] = useState("");
  const [nextId, setNextId] = useState(1);
  const [todoitems, setTodoItems] = useState(() => {
    let storedItems = localStorage.getItem("todoitems");
    if (storedItems) {
    }
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    let storedItems = localStorage.getItem("checkedItems");
    return storedItems ? JSON.parse(storedItems) : {};
  });

  const [active, setActive] = useState(() => {
    let falseCount = Object.values(checkedItems).filter(
      (value) => value === false
    ).length;
    return falseCount;
  });

  useEffect(() => {
    localStorage.setItem("todoitems", JSON.stringify(todoitems));
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    if (todoitems.length > 0) {
      setNextId(Math.max(...todoitems.map((todo) => todo.id)) + 1);
    } else {
      setNextId(1);
    }
    let falseCount = Object.values(checkedItems).filter(
      (value) => value === false
    ).length;
    setActive(falseCount);
  }, [checkedItems, todoitems]);

  function handleTodoChange(event) {
    setTodo(event.target.value);
  }
  function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodoItem = {
      id: nextId,
      text: todo,
    };
    setTodoItems([newTodoItem, ...todoitems]);
    setNextId(nextId + 1);

    const newCheckedItems = { ...checkedItems };
    newCheckedItems[newTodoItem.id] = false;
    setCheckedItems(newCheckedItems);
    setTodo("");
  }

  function handleDelete(item) {
    console.log("Deleting item:", item);
    let newTodoItems = todoitems.filter((i) => i.id !== item.id);
    console.log("New todo items:", newTodoItems);
    setTodoItems(newTodoItems);
    //updating checkboxes too
    let newcheckedItems = { ...checkedItems };
    delete newcheckedItems[item.id];
    setCheckedItems(newcheckedItems);
  }

  function handleCheckboxChange(item) {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[item.id] = !checkedItems[item.id];
    setCheckedItems(newCheckedItems);
  }
  function handlePlaceholderChange(value, item) {
    // setTodo(value);
    // console.log(todo);
    setTodoItems(
      todoitems.map((todoItem) => {
        if (todoItem.id === item.id) {
          return { ...todoItem, text: value };
        }
        return todoItem;
      })
    );
  }
  function handlePlaceholderSubmit(event, item) {
    let newTodo = {
      id: item.id,
      text: todo,
    };
    const updatedTodoItems = todoitems.map((todoItem) => {
      if (todoItem.id === item.id) {
        return newTodo;
        // Replace the old item with the new value
      }
      return todoItem;
    });

    // // Remove the old item from checkedItems if necessary
    // let newCheckedItems = { ...checkedItems };
    // newCheckedItems[newTodo.id] = checkedItems[item.id];
    // delete newCheckedItems[item.id]; // Remove the old item
    setTodo("");
    // Update states
    setTodoItems(updatedTodoItems);
    // setCheckedItems(newCheckedItems);
  }
  return (
    <>
      <div className="container">
        <AddTodo
          onTodoChange={handleTodoChange}
          onTodoSubmit={handleTodoSubmit}
          todoValue={todo}
        />
      </div>
      <div className="container">
        <ul className="list-group">
          {todoitems &&
            todoitems.map((item) => (
              <Todo
                key={item.id}
                item={item}
                onTodoDelete={() => handleDelete(item)}
                checked={checkedItems[item.id]}
                onCheckboxChange={(checked) =>
                  handleCheckboxChange(item, checked)
                }
                onPlaceholderChange={(value) =>
                  handlePlaceholderChange(value, item)
                }
                onPlaceholderSubmit={(event) =>
                  handlePlaceholderSubmit(event, item)
                }
              />
            ))}
        </ul>
      </div>

      <TodoFooter
        total={todoitems.length}
        active={active}
        completed={todoitems.length - active}
      />
    </>
  );
}
export default TodoItems;
