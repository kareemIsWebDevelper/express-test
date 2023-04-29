const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  
     title: {
          type: String,
          required: true
     },
     body: {
          type: String,
          required: true
     },
     author: {
          type: String,
          required: true
     }
}, { timestamps: true });

const Post = mongoose.model("post", postSchema);

module.exports = Post;