const session_opt = {
    secret: process.env.key_sec,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    },
};

module.exports = session_opt;