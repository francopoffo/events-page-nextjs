const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programação para todos",
    description:
      "Todos podem aprender a codar! Sim, todo mundo! Neste evento ao vivo, vamos passar por todas as bases fundamentais e começar também o seu primeiro código.",
    location: "Rua 25, 12345 Algum lugar",
    date: "12-05-2022",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Economia saudável",
    description:
      "Neste evento iremos mostrar como economizar na cozinha também significa comer mais saudável.",
    location: "Rua 93, 56789 Algum lugar",
    date: "05-10-2023",
    image: "images/cooking-event.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Cinema em 2023 no Brasil",
    description:
      "Você conhece os principais filmes feitos no Brasil em 2022? Aqui iremos conversar com envolvidos nos principais projetos do ano e conhecer um pouco mais dos bastidores.",
    location: "Rua 67, 10115 Algum outro lugar",
    date: "10-04-2023",
    image: "images/cinema-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
