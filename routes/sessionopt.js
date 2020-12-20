const session_opt = {
    secret: process.env.key_sec,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: false
    },
};

module.exports = session_opt;