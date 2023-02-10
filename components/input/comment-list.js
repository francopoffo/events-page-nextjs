import classes from "./comment-list.module.css";

function CommentList(props) {
  const items = props.items;

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item.comment._id}>
          <p>{item.comment.text}</p>
          <div>
            By <address>{item.comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
