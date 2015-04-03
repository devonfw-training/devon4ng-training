angular.module('app.main').factory('todos', function ($http) {
    'use strict';

    return {
        getTodos: function () {
            return $http.get('/services/todos').then(function (response) {
                return response.data;
            });
        },
        getTodoById: function (id) {
            return $http.get('/services/todos/' + id).then(function (response) {
                return response.data;
            });
        },
        saveTodo: function (todo) {
            return $http.put('/services/todos/' + todo.id, todo);
        },
        addTodo: function (todo) {
            return $http.post('/services/todos', todo);
        },
        archiveTodos: function (todo) {
            return $http.delete('/services/todos', todo);
        }
    }
});
