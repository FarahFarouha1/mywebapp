const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/todoListDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// TodoItem model schema
const TodoItem = mongoose.model('TodoItem', {
  text: String,
});

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await TodoItem.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const todoItem = new TodoItem({
    text: req.body.text,
  });
  try {
    const newTask = await todoItem.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await TodoItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
