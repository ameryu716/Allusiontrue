const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const pool = require("./routes/pool.js");
// const RedisStore = require('connect-redis')(session);
// const cookieParser = require("cookie-parser");
// const MemcachedStore = require("connect-memcached")(session);
const pgSession = require("connect-pg-simple")(session);
const Sequelize = require("sequelize");

// const session_opt = require("./routes/sessionopt.js")


// app.use(connect.cookieParser());
// app.use(connect.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));

 
// app.use(cookieParser());


const session_opt = {
    secret: process.env.key_sec,
    // key: "test",
    // proxy: "true",
    ssl: true,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pool,
        conString : process.env.DATABASE_URL,
        tableName: "session",
        // ssl: true
        ssl: {rejectUnauthorized: false }
    }),
    // name: 'SID',
    cookie: {
        httpOnly: true,
        secure: false,
        path: '/'
    },
};



const forminRouter = require("./routes/formin");
const homeRouter = require("./routes/home");

const app = express();

app.use(session(session_opt));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', 'ejs');

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/login",forminRouter);
app.use("/home",homeRouter);

app.set ('port', (process.env.PORT || 8080))
app.listen (app.get ('port'), (e) => {
    console.info (`PORT: ${app.get ('port')}`)
})

// app.listen(3060,()=>{
//     console.log("allusion(true)-started....");
// });

module.exports = app;