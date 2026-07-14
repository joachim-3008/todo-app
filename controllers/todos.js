const todoRouter = require("express").Router(); // importa el framework "express" y crea un enrutador para manejar las rutas de todo
const User = require("../models/user"); // importa el modelo de usuario
const Todo = require("../models/todo"); // importa el modelo de todo

// Ruta para obtener todas las tareas de un usuario
todoRouter.get("/", async (req, res) => {
  const user = req.user; // obtiene el usuario autenticado de la solicitud
  const todos = await Todo.find({ user: user.id }); // busca todas las tareas del usuario en la base de datos
  return res.status(200).json(todos); // devuelve las tareas en formato JSON con un código de estado 200
});

// Ruta para crear una nueva tarea
todoRouter.post("/", async (req, res) => {
  try {
    const user = req.user;
    const { text } = req.body;
    const newTodo = new Todo({ text, checked: false, user: user._id });

    const savedTodo = await newTodo.save();

    user.todos = (user.todos || []).concat(savedTodo._id);

    await user.save();

    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error en POST:", error);
    return res.status(500).json({ error: "Error al guardar la tarea" });
  }
});

// //ruta para borrar una tarea

todoRouter.delete("/:id", async (req, res) => {
  try {
    const user = req.user;

    // 1. Elimina la tarea de la colección Todo
    await Todo.findByIdAndDelete(req.params.id);

    // 2. Filtra el array
    const currentTodos = user.todos || [];
    user.todos = currentTodos.filter(
      (todoId) => todoId.toString() !== req.params.id,
    );

    // 3. Guarda el usuario actualizado
    await user.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error detallado en DELETE:", error);
    return res
      .status(500)
      .json({ error: "Error interno al eliminar la tarea" });
  }
});

todoRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;

    // pasar el ID dentro de un objeto como primer argumento
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { checked },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
});

module.exports = todoRouter;
