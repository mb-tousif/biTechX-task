import express, { Application } from "express";
import cors from "cors";
import server from "./server";
import users from "./data";

const app: Application = express();
const config = {
  port: 3000,
};

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server();

// Create user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).send(newUser);
});

// Read users
app.get('/users', (_req, res) => {
  res.send(users);
});

// Read single user
app.get('/users/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.send(user);
});

// Update user
app.patch('/users/:username', (req, res) => {
  const { username } = req.params;
  const updatedUser = req.body;
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.send(updatedUser);
});

// Delete user
app.delete('/users/:username', (req, res) => {
  const { username } = req.params;
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex ===-1) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.status(204).send(
    { 
        message: 'User deleted successfully' ,
    }
  );
});

app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port} 🚀`);
});

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    status: "fail",
    message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
  });
});