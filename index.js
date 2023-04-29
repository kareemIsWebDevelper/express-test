// IMPORT EXPRESS
const express = require("express");
const app = express();
const Post = require("./models/posts");

const { objectId } = require("mongodb");
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
require("dotenv").config();

const uri = "mongodb+srv://kareem:7410@cluster0.mwlkotc.mongodb.net/test-node?retryWrites=true&w=majority";

const mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( (res)=> { app.listen(3000) } )
  .catch( (error) => { console.log(error) } )

app.get("/add-post", (req, res) => {
  const newPost = {
  title: "My Second Blog",
  body: "Hello EveryBody!",
  author: "John Doe"
}
  const post = new Post(newPost);
  post.save()
  .then((result) => {
    res.send(result);
  })
  .catch((error)=> {
    console.log(error);
  } )
});


app.get("/posts", (req, res) => {
  Post.find().sort({ createdAt: -1 })
  .then(((data)=> {
    res.render("index", { title: "All Posts", posts: data })
  }))
  .catch((error) => {
    console.log(error);
  })
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
  .then((data) => {
    res.render("details", { post: data });
  })
  .catch((error)=> {
    console.log(error);
  })
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: "/posts" })
  })
  .catch((error)=> {
    console.log(error);
  })
})

// GET REQUEST URL "/" FROM SERVER AS HOME
app.get("/", (req, res)=> {
  res.redirect("/posts");
});

app.post("/posts", (req, res) => {
    const post = new Post(req.body);
    post.save()
    .then((result) => {
      // res.send(result);
      console.log(post);
      res.redirect("/posts");
    })
    .catch((error)=> {
      console.log(error);
    } )
})

// GET REQUEST URL "/create" FROM SERVER
app.get("/create", (req, res)=> {
  res.render("create", { title: "create Post" });
});

// GET ANY REQUEST URL AND RETURN 404 STATUS
app.use((req, res)=> {
  res.status(404).render("404");
});

