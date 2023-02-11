import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    if (enteredEmail.includes("@")) {
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      emailInputRef.current.value = "";
      setIsRegistered(true);
    }
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
