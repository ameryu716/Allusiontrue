const bcrypt = require('bcrypt');

const hashmodule = {
    hashing: function(pass){
        const hashedpass = bcrypt.hashSync(pass,10);
        return hashedpass;
    },
};

exports.hashmodule = hashmodule;