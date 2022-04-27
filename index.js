const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// midleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("all data");
});

// pass=hSMFLPo6zrAqzr8w
// name=

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.6plls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const fbPostDatabase = client.db("fbPosts").collection("posts");
    const name = { name: "rasel", age: 21 };
    // const result = await fbPostDatabase.insertOne(name);
    // get all posts
    app.get("/posts", async (req, res) => {
      const query = {};
      const cursor = fbPostDatabase.find(query);
      const posts = await cursor.toArray();
      res.send(posts);
    });
    // Insert fbPosts
    app.post("/posts", async (req, res) => {
      const newPost = req.body;
      const result = await fbPostDatabase.insertOne(newPost);
      res.send(result);
    });
  } finally {
    //  await client.close();
  }
}
run().catch(console.dir);

app.listen(port);
