const todoRouter = require('express').Router(); // importa el framework "express" y crea un enrutador para manejar las rutas de todo
const User = require('../models/user'); // importa el modelo de usuario
const Todo = require('../models/todo'); // importa el modelo de todo

todoRouter.get('/', async (req, res) => {
    const user = req.user; // obtiene el usuario del objeto de solicitud
    const todos = await Todo.find({ user: user.id });
    return res.status(200).json(todos);
});

todoRouter.post('/', async (req, res) => {
    const user = req.user; // obtiene el usuario del objeto de solicitud
    const { text } = req.body;
    const newTodo = new Todo({
        text,
        checked: false,
        user: user._id
    });

    const savedTodo = await newTodo.save();
    user.todos.concat(savedTodo._id);

    return res.status(201).json(savedTodo);
});

todoRouter.delete("/:id", async (req, res) => {
    const user = req.user;
    await Todo.findByIdAndDelete(req.params.id);
    user.todos = user.todos.filter(todo => todo.id !== req.params.id);
    await user.save();

    return res.sendStatus(204);
});

todoRouter.patch("/:id", async (req, res) => {
    const user = req.user;
    const { checked } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { checked });
    return res.sendStatus(200);
});


module.exports = todoRouter;

console.log('todo controller loaded');