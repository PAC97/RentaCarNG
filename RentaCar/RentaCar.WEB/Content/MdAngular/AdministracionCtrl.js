app.controller('AdministracionCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.posicion = 3;
    $scope.ListaEstado = function () {
        $http({
            method: 'GET',
            url: '../Administracion/ConsultarEstado ',
        }).then(function success(r) {
            $scope.EstadoData = r.data
            console.log($scope.EstadoData)
        });
    }
    $scope.ListaEstado();

    

    $scope.ListaTipoUser = function () {
        $http({
            method: 'GET',
            url: '../Administracion/ConsultarTipoUser ',
        }).then(function success(r) {
            $scope.TipoUserData = r.data
            console.log($scope.TipoUserData)
        });
    }
    $scope.ListaTipoUser();
    $scope.siguiente = function () {
        if ($scope.TipoUserData.length > $scope.posicion) {
            $scope.posicion += 3;
        };
    }
    $scope.anterior = function () {
        if ($scope.posicion > 3) {
            $scope.posicion -= 3;
        };
    }
    $scope.siguienteUser = function () {
        if ($scope.UserData.length > $scope.posicion) {
            $scope.posicion += 3;
        };
    }
    $scope.anteriorUser = function () {
        if ($scope.posicion > 3) {
            $scope.posicion -= 3;
        };
    }

    $scope.ListaUser = function () {
        $http({
            method: 'GET',
            url: '../Administracion/ConsultarUser ',
        }).then(function success(r) {
            $scope.UserData = r.data
            
            console.log($scope.UserData)
        });
    }
    $scope.ListaUser();

    $scope.ListaVehiculo = function () {
        $http({
            method: 'GET',
            url: '../Administracion/ConsultarVehiculo ',
        }).then(function success(r) {
            $scope.VehiculoData = r.data

            console.log($scope.VehiculoData)
        });
    }
    $scope.ListaVehiculo();
    
}]);