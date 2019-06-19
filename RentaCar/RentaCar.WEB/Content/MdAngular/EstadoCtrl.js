app.controller('EditCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    
    $scope.Estado = {};
    var codigo = $routeParams.EstadoID;

    $scope.creando = false;

    if (codigo == "nuevo") {
        $scope.creando = true;
    } else {
        $http.get('../Administracion/ConsultarEstadoID/' + codigo).then(function (data) {
            $scope.Estado = data;

            console.log($scope.Estado.data);
        });
    }
    $scope.guardarEstado = function () {
        if ($scope.creando) {
            $http({
                method: 'POST',
                url: '../Administracion/CreateEstado',
                data: $scope.Estado.data
            }).then(function success (r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Estado Insetado',

                    })
                    window.location.href = '/#!/Estado';
                }
                })
        } else {
            $http({
                method: 'POST',
                url: '../Administracion/EditEstado',
                data: $scope.Estado.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Estado Modificado',
                        
                    })
                    window.location.href = '/#!/Estado';
                }
            })
        }
        
    }

}]);