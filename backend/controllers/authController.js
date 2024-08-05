const { createUser, findUserByEmail } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('../utils/validator');

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!validator.isEmail(email) || !validator.isValidPassword(password)) {
    return res.status(400).json({ msg: 'Invalid email or password' });
  }

  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    await createUser({ fullName, email, password });
    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ name: user.fullName, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  signUp,
  signIn
};
