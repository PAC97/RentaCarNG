var app = angular.module('RentaCarApp', ['ngRoute']);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.Administracion = '../Administracion/Index';
    $scope.Menu = '../Home/menu';
    $scope.MenuSuperior = '../Administracion/menu';
    

}]);