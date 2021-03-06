// data dummy todos
let todos = [
  {
    id: 1,
    title: "Belajar Node JS",
    isDone: false,
  },
  {
    id: 2,
    title: "Belajar Express",
    isDone: false,
  },
  {
    id: 3,
    title: "Belajar React JS",
    isDone: false,
  },
];
// data dumyy todos

// get data todos route
exports.getTodos = (req, res) => {
  res.send({
    response: "Response Success",
    status: "Get data Success",
    data: todos,
  });
};
// End get data todos route

// get data todoById route
exports.getTodo = (req, res) => {
  const id = req.params.id;
  const todoById = todos.find((todo) => todo.id == id);

  if (!todoById) {
    return res.send({
      response: "Response Failed",
      status: `Data todo with ID ${id} NOT FOUND!`,
      data: null,
    });
  }

  res.send({
    response: "Response Success",
    status: "Get data Success",
    data: todoById,
  });
};
// end get data todoById route

// add data todos route
exports.addTodo = (req, res) => {
  const dataAdded = req.body;
  todos = [...todos, dataAdded];

  res.send({
    response: "Response Success",
    status: "Add data Success",
    dataAdded: dataAdded,
    dataAfterAdd: todos,
  });
};
// End add data todos route

// update data todo with patch route
exports.updateTodoPatch = (req, res) => {
  const { id } = req.params; // This is like ==> const id = req.params.id

  todos = todos.map((todo) => (todo.id == id ? req.body : todo));

  res.send({
    response: "Response Success",
    status: "Update data Success",
    id: id,
    dataUpdated: req.body,
    dataAfterUpdate: todos,
  });
};
// End update data todo with patch route

// update data todo with put route
exports.updateTodoPut = (req, res) => {
  const { id } = req.params; // This is like ==> const id = req.params.id

  todos = todos.map((todo) => (todo.id == id ? req.body : todo));

  res.send({
    response: "Response Success",
    status: "Update data Success",
    id: id,
    dataUpdated: req.body,
    dataAfterUpdate: todos,
  });
};
// End update data todo with put route

// delete data todo route
exports.deleteTodo = (req, res) => {
  const { id } = req.params; // This is like ==> const id = req.params.id

  todos = todos.filter((todo) => todo.id != id);

  res.send({
    response: "Response Success",
    status: "Delete data Success",
    idDataDelete: id,
    dataAfterDelete: todos,
  });
};
// End delete data todo route
