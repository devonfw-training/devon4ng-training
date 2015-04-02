angular.module('app.main').controller('TodoCntl', function ($scope, todos) {
    'use strict';
    $scope.todoList = todos.getTodos();
});
