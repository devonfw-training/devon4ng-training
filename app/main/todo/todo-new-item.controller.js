angular.module('app.main').controller('TodoNewItemCntl', function ($scope, todos, $location) {
    'use strict';
    $scope.todo = {};
    $scope.save = function () {
        todos.addTodo($scope.todo).then(function () {
            $location.path('/list')
        })
    };
    $scope.cancel = function () {
        $location.path('/list')
    }
});
