import { MongoClient } from "mongodb";


//only posta API here
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://inkapusta0:Naukaprogramowania1@ac-cjrttmg-shard-00-00.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-01.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-02.k8alrhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-xuf6pl-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
};

export default handler;
