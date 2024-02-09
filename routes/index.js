const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.get("/", async (req, res) => {
    const allTodo = await Todo.find();
    res.render("home", { todo: allTodo });
});

router.post("/add/todo", (req, res) => {
    const todo = req.body.todo;
    const newTodo = new Todo({ todo: todo });
    newTodo.save().then(() => {
        console.log("item has been added");
        res.redirect("/");
    });
});

router.get("/delete/todo/:_id", (req, res) => {
    const {_id } = req.params;
    Todo.deleteOne({ _id })
        .then(() => {
            console.log("deleted");
            res.redirect("/");
        });
});

module.exports = router;