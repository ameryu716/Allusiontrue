const bcrypt = require('bcrypt');

const hashing = function(pass){
    pass = bcrypt.hashSync(pass,10);
    return pass;
}

export {hashing};