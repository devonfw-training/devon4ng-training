var express = require('express');
var router = express.Router();
var todos = [
    {
        id: 1,
        title: 'todo 1 ',
        description: 'todo 1 description ',
        done: false
    },
    {
        id: 2,
        title: 'todo 2 ',
        description: 'todo 2 description ',
        done: false
    },
    {
        id: 3,
        title: 'todo 3 ',
        description: 'todo 3 description ',
        done: true
    },
    {
        id: 4,
        title: 'todo 4 ',
        description: 'todo 4 description ',
        done: true
    }
];
var sequence = 5;
var findTodoById = function (id) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            return todos[i];
        }
    }
    return null;
};

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
router.use(express.static('gulp/express/public'));
router.route('/todos')
    .get(function (req, res) {
        res.json(todos);
    })
    .post(function (req, res) {
        todos.push({
            id: sequence++,
            title: req.body.title,
            description: req.body.description,
            done: req.body.done
        });
        res.sendStatus(200);
    })
    .delete(function (req, res) {
        for (var i = todos.length - 1; i >= 0; i--) {
            if (todos[i].done === true) {
                todos.splice(i, 1);
            }
        }
        res.sendStatus(200);
    });

router.route('/todos/:todo_id')
    .get(function (req, res) {
        var todo = findTodoById(req.params.todo_id);
        if (todo) {
            res.json(todo);
        } else {
            res.sendStatus(404);
        }
    })
    .delete(function (req, res) {
        var todo = findTodoById(req.params.todo_id);
        if (todo) {
            todos.splice(todos.indexOf(todo), 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })

    .put(function (req, res) {
        var todo = findTodoById(req.params.todo_id);
        if (todo) {
            todos[todos.indexOf(todo)] = req.body;
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

module.exports = router;
