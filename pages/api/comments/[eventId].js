function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Dados válidos." });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);
    res
      .status(201)
      .json({ message: "Comentário adicionado.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummy_comments = [
      { id: "c1", name: "Franco", comment: "Primeiro comentário" },
      { id: "c2", name: "Foquinha", comment: "Secundo comentário" },
    ];

    res.status(200).json({ comments: dummy_comments });
  }
}

export default handler;
