import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
function AddTodoList(props) {
  return (
    <div className="container">
      <form
        className="d-flex align-items-center"
        style={{ gap: "2rem", marginLeft: "60px" }}
        onSubmit={props.onTodoSubmit}
      >
        <label>
          {" "}
          <h3>Add To-do </h3>
        </label>
        <input
          name="todoItem"
          required
          placeholder=" What needs to be done? "
          onChange={props.onTodoChange}
          // onFocus="this.value=''"
          value={props.todoValue}
        />

        <button className="button-30" type="submit">
          {" "}
          Add{" "}
        </button>
      </form>
    </div>
  );
}
export default AddTodoList;
