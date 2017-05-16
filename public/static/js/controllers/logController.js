var app = angular.module('expenseTracker');

app.controller('logController', function($window, $scope, $http, $uibModal, $location) {
    $scope.isLoggedIn = JSON.parse($window.sessionStorage.isLoggedIn || false);
    $scope.username = JSON.parse($window.sessionStorage.username || '{}');
    $scope.isAdmin = JSON.parse($window.sessionStorage.isAdmin || false);
    $http.get("api/v1/allLogs")
        .success(function (data) {
            $scope.allList = data;
        });
});