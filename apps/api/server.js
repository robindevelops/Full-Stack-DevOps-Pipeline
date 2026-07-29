const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for the "SaaS" app
let tasks = [
    { id: 1, title: 'Learn Docker', status: 'pending' },
    { id: 2, title: 'Setup CI/CD pipeline', status: 'pending' },
];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title || 'New Task',
        status: 'pending'
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
