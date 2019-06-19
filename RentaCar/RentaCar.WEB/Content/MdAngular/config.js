app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'Administracion/Index',
        controller:'UserCtrl'
    }).when('/prueba', {
            templateUrl: 'Home/prueba'
        }).when('/Estado', {
            templateUrl: 'Administracion/EstadoIndex',
            controller: 'AdministracionCtrl'
        }).when('/EditEstado/:EstadoID', {
            templateUrl: 'Administracion/EditEstado',
            controller: 'EditCtrl'
        }).when('/TipoUser', {
            templateUrl: 'Administracion/TipoUserIndex',
            controller: 'AdministracionCtrl'
        }).when('/EditTipoUser/:TipoUserID', {
            templateUrl: 'Administracion/EditTipoUser',
            controller: 'TipoUserCtrl'
        }).when('/DeleteTipoUser/:TipoUserID', {
            templateUrl: 'Administracion/DeleteTipoUser',
            controller: 'TipoUserCtrl'
        }).when('/User', {
            templateUrl: 'Administracion/UserIndex',
            controller: 'AdministracionCtrl'
        }).when('/EditUser/:UserID', {
            templateUrl: 'Administracion/EditUser',
            controller: 'UserCtrl'
        }).when('/DeleteUser/:UserID', {
            templateUrl: 'Administracion/DeleteUser',
            controller: 'UserCtrl'
        }).when('/Vehiculo',{
            templateUrl: 'Administracion/VehiculoIndex',
            controller:'AdministracionCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});