const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vashwin@123',
  database: 'authpages'
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error('Unable to connect to the database:', err.message);
      process.exit(1);
    } else {
      console.log('MySQL Connected...');
    }
  });
};

module.exports = { db, connectDB };