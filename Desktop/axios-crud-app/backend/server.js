const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Surendra" }
];

// GET Request
app.get("/users", (req, res) => {
  res.json(users);
});

// POST Request
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.json({ message: "User created", user: user });
});

// PUT Request
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  let user = users.find(u => u.id == id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name;
  res.json({ message: "User updated", user: user });
});

// DELETE Request
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter(u => u.id != id);
  res.json({ message: "User deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});