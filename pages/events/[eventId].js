import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSumarry from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function EventDetail() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);
  console.log(event);

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Nenhum evento foi encontrado.</p>
        </ErrorAlert>
        <div className="center">
          <Button className="center" link="/events">
            Todos os eventos
          </Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSumarry title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetail;
