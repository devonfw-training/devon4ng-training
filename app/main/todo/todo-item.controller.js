angular.module('app.main').controller('TodoItemCntl', function ($scope, todo, todos, $location) {
    'use strict';
    $scope.todo = todo;
    $scope.save = function () {
        todos.saveTodo($scope.todo).then(function () {
            $location.path('/list')
        })
    };
    $scope.cancel = function () {
        $location.path('/list')
    }
});
