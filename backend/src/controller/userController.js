const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, getAllUsers } = require('../model/userModel');

const generateCustomerId = () => {
  return 'CUST-' + Math.floor(100000 + Math.random() * 900000);
};

// ✅ Register
exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  findUserByEmail(email, (err, result) => {
    if (result.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const customer_id = generateCustomerId();

    const newUser = { username, email, password: hashedPassword, customer_id, role: role || 'user' };

    createUser(newUser, (err, result) => {
      if (err) return res.status(500).json({ message: "Error creating user" });
      res.status(201).json({ message: "User registered successfully", customer_id });
    });
  });
};

// ✅ Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, users) => {
    if (users.length === 0) return res.status(404).json({ message: "User not found" });

    const user = users[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, customer_id: user.customer_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role , username: user.username});
  });
};

// ✅ Get All Users
exports.getUsers = (req, res) => {
  getAllUsers((err, users) => {
    if (err) return res.status(500).json({ message: "Error retrieving users" });
    res.status(200).json(users);
  });
};
