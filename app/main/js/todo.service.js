angular.module('app.main').factory('todos', function () {
    'use strict';

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

    return {
        getTodos: function () {
            return todos;
        },
        getTodoById: function (id) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    return todos[i];
                }
            }
            return null;
        }
    }
});
