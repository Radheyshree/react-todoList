import "../styles.css"
function TodoList({ children }) {
  return (
    <>
      <h1> To-do List </h1>
      <div>{children} </div>
    </>
  );
}
export default TodoList;
