import { useState, useEffect, useContext } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      notificationCtx.showNotification({
        title: "Aguarde...",
        message: "Buscando os comentários",
        status: "pending",
      });
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          notificationCtx.showNotification({
            title: "Sucesso!",
            message: "Comentários carregados",
            status: "success",
          });
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Erro",
            message: error.message || "Não foi possível buscar os comentários",
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Aguarde...",
      message: "Enviando seu comentário",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: "Sucesso",
          message: "O seu comentário foi postado.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Erro",
          message: error.message || "Não foi possível enviar o seu comentário.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Esconder" : "Mostrar"} comentários
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
