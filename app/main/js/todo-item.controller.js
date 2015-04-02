angular.module('app.main').controller('TodoItemCntl', function ($scope, todo, $location) {
    'use strict';
    $scope.todo = todo;
    $scope.ok = function () {
        $location.path('#/list')
    }

});
