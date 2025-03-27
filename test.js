const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://MarcusChrispat:Vande@chrispatcluster.sxkhx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB from VS Code!");
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await client.close();
  }
}

run();
