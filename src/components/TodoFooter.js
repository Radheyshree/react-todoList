import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
function TodoFooter(props) {
  return (
    
      <div className="footer">
        <span>Total: {props.total}</span>
        <span>Active: {props.active}</span>
        <span>Completed: {props.completed}</span>
      </div>
  );
}
export default TodoFooter;
