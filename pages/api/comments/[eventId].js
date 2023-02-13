import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await MongoClient.connect(
      "mongodb+srv://francopoffo:0256514@cluster0.2dqxtja.mongodb.net/events?retryWrites=true&w=majority"
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possível se conectar a base de dados." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      const db = client.db();

      result = await db
        .collection("comment")
        .insertOne({ comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Não foi inserir dados na base de dados" });
      client.close();
      return;
    }

    newComment._id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    try {
      const db = client.db();

      const documents = await db
        .collection("comment")
        .find()
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json({ comments: documents });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Não foi possível buscar os comentários." });
    }
  }
  client.close();
}

export default handler;
