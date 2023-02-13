import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Email inválido" });
      return;
    }

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

    try {
      const db = client.db();
      await db.collection("newsletter").insertOne({ email: userEmail });
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Não foi inserir dados na base de dados" });
      return;
    }

    res.status(201).json({ message: "Registrado!" });
  }
}

export default handler;
