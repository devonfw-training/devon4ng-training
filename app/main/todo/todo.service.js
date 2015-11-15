angular.module('app.main').factory('todos', function () {
    'use strict';

    var todos = [
        {
            title: 'todo 1 ',
            description: 'todo 1 description ',
            done: false
        },
        {
            title: 'todo 2 ',
            description: 'todo 2 description ',
            done: false
        },
        {
            title: 'todo 3 ',
            description: 'todo 3 description ',
            done: true
        },
        {
            title: 'todo 4 ',
            description: 'todo 4 description ',
            done: true
        }
    ];

    return {
        getTodos: function () {
            return todos;
        }
    }
});
