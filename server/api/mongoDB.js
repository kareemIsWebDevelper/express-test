const Post = require("./models/posts");
const path = require("path");
const { users } = require("./data");
app.set("view engine", "ejs");
var morgan = require("morgan");
app.use(morgan("dev"));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kareem:7410@cluster0.mwlkotc.mongodb.net/test-node?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( (res)=> { app.listen(3000) } )
  .catch( (error) => { console.log(error) } )

app.get("/add-post", (req, res) => {
  const post = new Post({
    title: "My Second Blog",
    body: "Hello EveryBody!",
    author: "John Doe"
  });
  post.save()
  .then((result) => {
    res.send(result);
  })
  .catch((error)=> {
    console.log(error);
  } )
});

app.get("/all-posts", (req, res) => {
  Post.find()
  .then((data) => {
    res.send(data);
  })
  .catch((error)=> {
    console.log(error);
  })

});

app.get("/single-post", (req, res) => {
  Post.findById("644b8369487fb144602efe3a")
  .then((data) => {
    res.send(data);
  })
  .catch((error)=> {
    console.log(error);
  })
});

module.exports("*");