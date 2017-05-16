var app = angular.module('expenseTracker');

app.controller('homeController', function($window, $scope, $http, $uibModal, $location) {
    $scope.username = JSON.parse($window.sessionStorage.username || '{}');
    $scope.isLoggedIn = JSON.parse($window.sessionStorage.isLoggedIn || false);
    $scope.isAdmin = JSON.parse($window.sessionStorage.isAdmin || false);

    //update the login status
    $scope.$watch(function () {
        return $window.sessionStorage.isLoggedIn;
    }, function (newValue, oldValue) {
        $scope.isLoggedIn = JSON.parse(newValue || false);
        if ($scope.isLoggedIn) {
            $scope.isAdmin = JSON.parse($window.sessionStorage.isAdmin || false);
            getMyLogs();
        }
    });
    //used to log the expense
    $scope.submit = function () {
        if ($scope.isLoggedIn) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || "{}");
        } else {
            $http.defaults.headers.common.Authorization = undefined;
        }
        console.log("date: " + $scope.date);
        var date = new Date($scope.date);
        $http.post("api/v1/logExpense", {
            username: $scope.username,
            amount: $scope.amount,
            date: date,
            des: $scope.des
        })
            .success(function(data) {
                $scope.err = data.err;
                $scope.res = data.res;
                getMyLogs();
            });
    };
    //triggered when the update button is clicked
    $scope.update = function (log) {
        openModal(log);
    };
    //triggered when the delete button is clicked
    $scope.delete = function (log) {
        $http.post("api/v1/deleteLog", {
            log: log
        })
            .success(function (data) {
                getMyLogs();
            });
    };
    //triggered when the report button is clicked
    $scope.report = function () {
        $location.path("/report");
    };
    //triggered when the all logs button is clicked
    $scope.allLogs = function () {
        $location.path("/logs");
    };
    //used to update the list of logs stated
    var getMyLogs = function () {
        $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || "{}");
        $http.get("api/v1/getMyLogs")
            .success(function (data) {
                console.log(data);
                $scope.list = data;
            });
    };
    //used to open a expense modal for modification
    function openModal(log) {
        $uibModal.open({
            templateUrl: "./public/views/expenseModal.html",
            controller: "expenseModalController",
            size: "sm",
            resolve: {
                log: function () {
                    return log;
                }
            }
        }).result.then(function (data) {
        });
    }
    getMyLogs();
});