const express = require('express');
const path = require ("path");
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

const postRoutes = require("./routes/posts");
const userRuotes  = require('./routes/user');

var cors = require('cors')

app.use(cors())
mongoose.connect(
  "mongodb+srv://swas:Ud5XgiZ6UExk366@cluster0.h7usx.mongodb.net/node-angular"
  ).then(()=>{
  console.log("connected to the database");
})
.catch(() =>{
   console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded:false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Conrol-Allow-Methods",
  "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  next();
});




app.use("/api/posts",postRoutes);
app.use("/api/user",userRuotes);
module.exports = app;
