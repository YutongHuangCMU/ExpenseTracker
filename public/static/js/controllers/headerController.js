var app = angular.module('expenseTracker');

app.controller('headerController', function($window, $scope, $uibModal, $location) {
    $scope.isLoggedIn = JSON.parse($window.sessionStorage.isLoggedIn || false);
    $scope.username = JSON.parse($window.sessionStorage.username || '{}');
    $scope.isAdmin = JSON.parse($window.sessionStorage.isAdmin || false);

    function openModal(loginType) {
        $uibModal.open({
            templateUrl: "./public/views/modal.html",
            controller: "modalController",
            size: "sm",
            resolve: {
                loginType: function () {
                    return loginType;
                }
            }
        }).result.then(function (data) {
            $scope.isLoggedIn = true;
            $scope.isAdmin = data.isAdmin;
            $scope.username = data.username;
            updateSessionStorage(data.username, data.token, true, data.isAdmin);
        });
    }

    $scope.signup = function() {
        openModal("Sign Up");
    };
    $scope.login = function() {
        openModal("Log In");
    };
    $scope.logout = function() {
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;
        $scope.username = {};
        updateSessionStorage({}, {}, false, false);
        $location.path("/");
    };

    function updateSessionStorage(username, token, isLoggedIn, isAdmin) {
        $window.sessionStorage.username = JSON.stringify(username);
        $window.sessionStorage.token = JSON.stringify(token);
        $window.sessionStorage.isLoggedIn = JSON.stringify(isLoggedIn);
        $window.sessionStorage.isAdmin = JSON.stringify(isAdmin);
    }
});