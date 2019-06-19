app.controller('VehiculoCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    $scope.Vehiculo = {};
    var codigo = $routeParams.VehiculoID;

    $scope.creando = false;
    $scope.Estadoo = false;
    $scope.Editando = false;

    if (codigo == "nuevo") {
        $scope.creando = true;
        $scope.Estadoo = true;
    } else {
        $http.get('../Administracion/ConsultarVehiculoID/' + codigo).then(function (data) {
            $scope.Editando = true;
            $scope.Vehiculo = data;

            console.log($scope.Vehiculo.data);
        });
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

    }
    $scope.guardarVehiculo = function () {
        if ($scope.creando && $scope.Estadoo) {

            $http({
                method: 'POST',
                url: '../Administracion/CreateVehiculo',
                data: $scope.Vehiculo.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Vehiculo Insetado',

                    })
                    window.location.href = '/#!Vehiculo/';
                }
            })
        } else if ($scope.Editando) {
            $http({
                method: 'POST',
                url: '../Administracion/EditVehiculo',
                data: $scope.Vehiculo.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Vehiculo Modificado',

                    })
                    window.location.href = '/#!Vehiculo';
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'No se encuentra el dato',

                    })
                    window.location.href = '/#!Vehiculo';
                }
            })
        }
    }
    $scope.eliminarVehiculo = function (VehiculoID) {
        $http({
            method: 'POST',
            url: '../Administracion/DeleteVehiculo',
            data: { id: VehiculoID }
        }).then(function success(r) {
            if (r.data != null) {
                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Usuario eliminado',

                })
                window.location.href = '/#!Vehiculo';
            }
        })
    }
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

}]);