const path = require("path");
const { users } = require("./data");
var morgan = require("morgan");
app.use(morgan("dev"));

const { MongoClient, ServerApiVersion } = require('mongodb');

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

   // GET REQUEST AND RETURN JSON DATA AS RESPONSE
app.get("/api/users", (req, res) => {
     const newUsers = users.map((user) => {
         const { id, name } = user;
         return { id, name }
     })
     res.json(newUsers);
   });
   
   // GET REQUEST AND RETURN JSON DATA AS RESPONSE FOR ID
   app.get("/api/users/:id", (req, res) => {
     const { id } = req.params;
   
     const user = users.find((user)=> user.id === Number(id));
   
     !user ? res.status(404).send("No Data!") : "";
     res.json(user);
   });
   
   app.get("/api/users/:id/reviews/:id", (req, res) => {
       console.log(req.params);
       res.send("hello world");
   });
   
   