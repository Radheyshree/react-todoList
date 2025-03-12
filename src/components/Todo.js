import { useState } from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Todo(props) {
  //const [index, setIndex] = useState(0);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  function handleTodoClick() {
    setIsPlaceholder(!isPlaceholder);
    props.onPlaceholderChange(props.item.text);
  }
  //list-group-item
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="checkbox-wrapper-25">
        <input
          type="checkbox"
          value="todo"
          onChange={props.onCheckboxChange}
          checked={props.checked}
        />
      </div>
      <span>
        <label htmlFor="todo" onClick={handleTodoClick}>
          {isPlaceholder ? (
            <input
              type="text"
              value={props.item.text}
              autoFocus={true}
              onChange={(event) =>
                props.onPlaceholderChange(event.target.value, props.item)
              }
              onClick={(event) => props.onPlaceholderSubmit(event)}
            />
          ) : (
            props.item.text
          )}
        </label>
      </span>
      <button className="button-30" type="button" onClick={props.onTodoDelete}>
        {" "}
        Delete{" "}
      </button>
    </div>
  );
}
export default Todo;
