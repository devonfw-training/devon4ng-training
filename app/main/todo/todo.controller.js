angular.module('app.main').controller('TodoCntl', function ($scope, todos, $location) {
    'use strict';
    $scope.todoList = [];
    var loadTodos = function () {
        todos.getTodos().then(function (data) {
            angular.copy(data, $scope.todoList);
        });
    };
    loadTodos();
    $scope.add = function () {
        $location.path('/add')
    };
    $scope.update = function (todo) {
        todos.saveTodo(todo);
    };
    $scope.archive = function () {
        todos.archiveTodos().then(loadTodos)
    }
});
