const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const methodOverride = require('method-override');

const app = express();
const port = 5000;

// Routers
const pageRouter = require('./routers/photoRouters');

// TAMPLATE ENGINGE
app.set('view engine', 'ejs');

// DB connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/agency-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

app.use('/', pageRouter);

app.listen(port, () => {
    console.log(`Sunucu portu : ${port} ...`);
  });