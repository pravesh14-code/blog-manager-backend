const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async ({ full_name, email, password, profile_pic }) => {
  const hashedPassword = await bcrypt.hash(password, 10); //HashedPassword

  const data = {
    full_name,
    email,
    password: hashedPassword,
  };

  if (profile_pic) {
    data.profile_pic = profile_pic;
  }

  const user = await User.create(data);
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};
