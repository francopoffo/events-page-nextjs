import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";

function Home(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Descubra eventos que te ajudam a crescer"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
