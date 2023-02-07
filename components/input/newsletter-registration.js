import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Registre-se para ficar atualizado!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Seu email"
            aria-label="Seu email"
          />
          <button>Registrar</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
