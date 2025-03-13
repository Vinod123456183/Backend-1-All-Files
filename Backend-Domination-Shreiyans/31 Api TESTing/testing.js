const bcrypt = require("bcrypt");

function hashedpassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hashed) => {
        if (err) reject(err);
        resolve(hashed);
      });
    });
  });
}

module.exports = hashedpassword;
