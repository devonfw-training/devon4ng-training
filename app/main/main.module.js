angular.module('app.main', ['ngRoute']).config(function ($routeProvider) {
    'use strict';

    $routeProvider.when('/list', {
        templateUrl: 'main/todo/list.html',
        controller: 'TodoCntl'
    }).when('/item/:todoId', {
        templateUrl: 'main/todo/item.html',
        controller: 'TodoItemCntl',
        resolve: {
            todo: function ($route, todos) {
                return todos.getTodoById(parseInt($route.current.params.todoId, 10));
            }
        }
    }).otherwise({
        redirectTo: '/list'
    });
});
