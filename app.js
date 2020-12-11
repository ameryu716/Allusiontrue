let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

let artcardRouter = require("./routes/artcard");
let cardlistRouter = require("./routes/cardlist");
let forminRouter = require("./routes/formin");
let homeRouter = require("./routes/home");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', 'ejs');



app.use(express.static("public"));

app.use("/art",artcardRouter);
app.use("/cardlist",cardlistRouter);
app.use("/login",forminRouter);
app.use("/home",homeRouter);



app.listen(3060,()=>{
    console.log("allusion(false)-started....");
});

module.exports = app;