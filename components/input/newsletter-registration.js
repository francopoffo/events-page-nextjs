import classes from "./newsletter-registration.module.css";
import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);

  function registrationHandler(event) {
    event.preventDefault();

    setIsRegistered(false);

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Registrando...",
      message: "Estamos te registrando na newsletter...",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Algo de errado aconteceu.");
        });
      })
      .then((data) => {
        console.log(data);

        notificationCtx.showNotification({
          title: "Registrado!",
          message: "Registro concluído com sucesso.",
          status: "success",
        });

        emailInputRef.current.value = "";
        setIsRegistered(true);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Erro...",
          message:
            error.message || "Não foi possível o registro na newsletter.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Registre-se para ficar atualizado!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Seu email"
            aria-label="Seu email"
          />
          <button>Registrar</button>
        </div>
      </form>
      {isRegistered && (
        <p className={classes.registered}>Obrigado por se registrar!</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
