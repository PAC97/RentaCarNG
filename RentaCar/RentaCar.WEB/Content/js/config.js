app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'Administracion/Index'
    }).when('/prueba', {
        templateUrl: 'Home/prueba'
    })
        .otherwise({
            redirectTo: '/'
        });
});