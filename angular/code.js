angular.module('myFirst', [])
    .controller('MyFirstCntl', function ($scope, userService) {
        $scope.fullName = userService.getFullName();
    })
    .factory('userService', function () {
        var user = {
            name: 'John',
            surname: 'Nowak'
        };
        return {
            getFullName: function () {
                return user.name + ' ' + user.surname;
            }
        }
    });

angular.module('myFirst', [])
    .controller('MyFirstCntl', function ($scope, userService) {
        $scope.fullName = userService();
    })
    .factory('userService', function () {
        var user = {
            name: 'John',
            surname: 'Nowak'
        };
        return function () {
            return user.name + ' ' + user.surname;
        }
    });

angular.module('myFirst', [])
    .controller('MyFirstCntl', function ($scope, userService) {
        $scope.fullName = userService;
    })
    .factory('userService', function () {
        var user = {
            name: 'John',
            surname: 'Nowak'
        };
        return user.name + ' ' + user.surname;
    });


function UnicornLauncher(apiToken) {
    this.launchedCount = 0;
    this.launch = function () {
        //uses apiToken somehow
        this.launchedCount++;
    }
}

angular.module('myFirst', [])
    .config(function (unicornLauncherProvider) {
        unicornLauncherProvider.setGalaxName('Andromeda');
    })
    .provider('unicornLauncher', function () {
        var galaxyName = 'the Milky Way';

        this.setGalaxyName = function (galaxy) {
            galaxyName = galaxy;
        };

        this.$get = ["apiToken", function (apiToken) {
            return new UnicornLauncher(apiToken, galaxyName);
        }];
    })
    .controller('DemoCntl', function ($scope, unicornLauncher) {
        unicornLauncher.launch();
    });


angular.module('myFirst', []).config(function ($routeProvider) {
    $routeProvider.when('/books', {
        templateUrl: '/library/html/books.html',
        controller: 'BooksCntl'
    }).when('/articles', {
        templateUrl: '/library/html/articles.html',
        controller: 'ArticlesCntl'
    })
});