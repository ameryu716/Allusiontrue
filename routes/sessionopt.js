// const session_opt = {
//     secret: process.env.key_sec,
//     resave: false,
//     saveUninitialized: false,
//     store: new RedisStore({  // Redisの設定
//         host: '127.0.0.1',
//         port: 6379,
//         prefix: 'sid:'
//       }),
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         path: '/'
//     },
// };

// module.exports = session_opt;