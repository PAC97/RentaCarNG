app.controller('UserCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    $scope.User = {};
    var codigo = $routeParams.UserID;

    $scope.creando = false;
    $scope.Estadoo = false;
    $scope.Editando = false;

    if (codigo == "nuevo") {
        $scope.creando = true;
        $scope.Estadoo = true;
    } else {
        $http.get('../Administracion/ConsultarUserID/' + codigo).then(function (data) {
            $scope.Editando = true;
            $scope.User = data;

            console.log($scope.User.data);
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
    $scope.guardarUser = function () {
        if ($scope.creando && $scope.Estadoo) {

            $http({
                method: 'POST',
                url: '../Administracion/CreateUser',
                data: $scope.User.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Usuario Insetado',

                    })
                    window.location.href = '/#!User/';
                }
                })
        } else if ($scope.Editando) {
            $http({
                method: 'POST',
                url: '../Administracion/EditUser',
                data: $scope.User.data
            }).then(function success(r) {
                if (r.data != null) {
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Usuario Modificado',

                    })
                    window.location.href = '/#!User';
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'No se encuentra el dato',

                    })
                    window.location.href = '/#!User';
                }
            })
        }
    }
    $scope.eliminarUser = function (UsuarioID) {
        $http({
            method: 'POST',
            url: '../Administracion/DeleteUser',
            data: { id: UsuarioID }
        }).then(function success(r) {
            if (r.data != null) {
                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Usuario eliminado',
                    
                })
                window.location.href = '/#!User';
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
    
    $scope.VerificarUser = function () {
        debugger
        if ($scope.TxtNomUserVerificar == null && $scope.TxtPass == null) {
            Swal.fire({
                type: 'error',
                title: 'Campos vacios',
                text: 'Debe llenar ambos campos',

            });
        }
        else {
            $http({
                method: 'POST',
                url: '../Administracion/ComprobarUser ' ,
                data: {
                    nomUser: $scope.TxtNomUserVerificar,
                    pass: $scope.TxtPass,
                    tipoUser: $scope.TxtTipoUserVerificar
                }
            }).then(function success(respuesta) {
                if (respuesta.data == 1) {      
                    Swal.fire({
                        type: 'success',
                        title: 'Exito',
                        text: 'Bienvenido',

                    });
                    $scope.TxtNomUserVerificar = null, $scope.TxtPass = null;

                    setTimeout(function () {
                        window.location.href = '/#!User';
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Datos incorrectos',
                        text: 'Verifique si los datos son correctos',

                    });
                    $scope.TxtNomUserVerificar = null, $scope.TxtPass = null;
                }
            });
        };
    }

}]);