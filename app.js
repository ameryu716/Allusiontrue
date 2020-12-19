const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const session_opt = require("./routes/sessionopt.js")

// let artcardRouter = require("./routes/artcard");
// let cardlistRouter = require("./routes/cardlist");
let forminRouter = require("./routes/formin");
let homeRouter = require("./routes/home");

const app = express();


app.use(session(session_opt));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', 'ejs');

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));






// app.use("/art",artcardRouter);
// app.use("/cardlist",cardlistRouter);
app.use("/login",forminRouter);
app.use("/home",homeRouter);

app.listen(3060,()=>{
    console.log("allusion(true)-started....");
});

module.exports = app;