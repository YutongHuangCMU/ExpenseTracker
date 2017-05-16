var app = angular.module('expenseTracker');

app.controller('modalController', function ($scope, $http, $uibModalInstance, loginType, $location) {
    $scope.accessCode = "";
    $scope.loginType = loginType;
    $scope.isAdmin = false;
    $scope.ok = function () {
        if (loginType === "Sign Up") {
            authenticate("signup");
        } else if (loginType === "Log In") {
            authenticate("login");
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    //used to authenticate the info input
    function authenticate(postUrl) {
        $http.post("/api/v1/" + postUrl , {
            username: $scope.username,
            password: $scope.password, //TODO: use https
            accessCode: $scope.accessCode,
            isAdmin: $scope.isAdmin
        }).success(function (data) {
            if (data.err) {
                $scope.error = data.err;
            } else {
                var user = {
                    username: $scope.username,
                    isAdmin: $scope.isAdmin,
                    token: data.token
                };
                $uibModalInstance.close(user);
                $location.path("/");
            }
        });
    }
});