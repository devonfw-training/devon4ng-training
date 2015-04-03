angular.module('app.main', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: 'main/html/list.html',
            controller: 'TodoCntl'
        })
        .when('/item/:todoId', {
            templateUrl: 'main/html/item.html',
            controller: 'TodoItemCntl',
            resolve: {
                todo: function ($route, todos) {
                    return todos.getTodoById(parseInt($route.current.params.todoId, 10));
                }
            }
        })
        .when('/add', {
            templateUrl: 'main/html/item.html',
            controller: 'TodoNewItemCntl'
        }).otherwise({
            redirectTo: '/list'
        })
});
