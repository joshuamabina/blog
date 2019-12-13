'use strict';

const express = require('express');

const app = express();
const PORT = 3000;


// use mongoose to connect to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dockernode', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'Error: Problem connecting to the database.'));
mongoose.connection.on('disconnected', console.error.bind(console, 'Error: Connecting to the database has stopped.'));


// define a task schema
const taskSchema = new mongoose.Schema({ title: String, body: String });
const Task = mongoose.model('Task', taskSchema);


// use body-parser to incoming requests as json
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// get all tasks
app.get('/tasks', (req, res) => {
  Task
    .find({})
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(500).json(error));
});

// create a task
app.post('/tasks', (req, res) => {
  Task
    .create(req.body)
    .then(res.status(200).json)
    .catch(res.status(500).json);
});

// update a task
app.patch('/tasks/:id/', (req, res) => {
  Task
    .findByIdAndUpdate(req.params.id, req.body)
    .then(res.status(200).json)
    .catch(res.status(500).json);
});

// delete a task
app.delete('/tasks/:id/', (req, res) => {
  Task
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({}))
    .catch(res.status(500).json);
});


app.listen(PORT, () => console.log(`App runs on port: ${PORT}`));
