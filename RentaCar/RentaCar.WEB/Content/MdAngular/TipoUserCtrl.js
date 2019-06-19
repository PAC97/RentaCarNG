app.controller('TipoUserCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    $scope.TipoUser = {};
    var codigo = $routeParams.TipoUserID;

    $scope.creando = false;
    $scope.Estadoo = false;

    if (codigo == "nuevo") {
        $scope.creando = true;
        $scope.Estadoo = true;
    } else {
        $http.get('../Administracion/ConsultarTipoUserID/' + codigo).then(function (data) {
            $scope.TipoUser = data;

            console.log($scope.TipoUser.data);
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
    $scope.guardarTipoUser = function () {
        if ($scope.creando && $scope.Estadoo) {
            $http({
                method: 'POST',
                url: '../Administracion/CreateTipoUser',
                data: $scope.TipoUser.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Tipo de usuario Insetado',

                    })
                    window.location.href = '/#!TipoUser/';
                }
            })
        } else {
            $http({
                method: 'POST',
                url: '../Administracion/EditTipoUser',
                data: $scope.TipoUser.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Tipo de usuario Modificado',

                    })
                    window.location.href = '/#!TipoUser';
                } 
            })
        }
    }
    $scope.eliminarTipoUser = function (TipoUsuarioID) {
        $http({
            method: 'POST',
            url: '../Administracion/DeleteTipoUser',
            data: { id: TipoUsuarioID }
        }).then(function success(r) {
            if (r.data != null) {
                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Tipo de usuario eliminado',
                   
                })
                window.location.href = '/#!TipoUser/';
            }
        })
    }

}]);