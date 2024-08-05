const db = require('../config/db').db;
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Users (fullName, email, password) VALUES (?, ?, ?)';
    db.query(sql, [user.fullName, user.email, hashedPassword], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
