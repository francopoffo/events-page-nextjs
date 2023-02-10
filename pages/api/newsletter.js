import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Email inválido" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://francopoffo:0256514@cluster0.2dqxtja.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Registrado!" });
  }
}

export default handler;
