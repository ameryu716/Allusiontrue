const bcrypt = require('bcrypt');

function hashing(pass){
    const hashedpass = bcrypt.hashSync(pass,10);
    return hashedpass;
};

exports.hashing = hashing();