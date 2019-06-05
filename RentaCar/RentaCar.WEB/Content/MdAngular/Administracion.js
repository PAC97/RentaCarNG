var app = angular.module('RentaCarApp', ['ngRoute']);

app.controller('AdministracionController', ['$scope', '$http', function ($scope, $http) {
    $scope.ListaEstado = function () {
        $http({
            method: 'POST',
            url: '../Administracion/ConsultarEstado',
        }).then(function success(r) {
            $scope.EstadoData = r.data
        });
    }

    $scope.ListaEstado();
}]);