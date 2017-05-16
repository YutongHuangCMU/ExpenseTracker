var app = angular.module('expenseTracker');

app.controller('homeController', function($window, $scope, $http, $uibModal) {
    $scope.username = JSON.parse($window.sessionStorage.username || '{}');
    $scope.$watch(function () {
        return $window.sessionStorage.isLoggedIn;
    }, function (newValue, oldValue) {
        $scope.isLoggedIn = JSON.parse(newValue || false);
        if ($scope.isLoggedIn) {
            getMyLogs();
        }
    });
    $scope.submit = function () {
        if ($scope.isLoggedIn) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || "{}");
        } else {
            $http.defaults.headers.common.Authorization = undefined;
        }
        var year = $scope.date.getFullYear();
        var month = $scope.date.getMonth() + 1;
        var day = $scope.date.getDate();
        var hour = $scope.time.getHours();
        var min = $scope.time.getMinutes();
        if (month < 10) {
            month = "0" + month;
        }
        var date = month+"/"+day+"/"+year;
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        var time = hour+":"+min;
        console.log("date: " + $scope.date);
        $http.post("api/v1/logExpense", {
            username: $scope.username,
            amount: $scope.amount,
            date: date,
            time: time,
            des: $scope.des
        })
            .success(function(data) {
                $scope.err = data.err;
                $scope.res = data.res;
                getMyLogs();
            });
    };

    $scope.update = function (log) {
        openModal(log);
    };

    $scope.delete = function (log) {
        $http.post("api/v1/deleteLog", {
            log: log
        })
            .success(function (data) {
                getMyLogs();
            });
    };

    var getMyLogs = function () {
        $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || "{}");
        $http.get("api/v1/getMyLogs")
            .success(function (data) {
                $scope.list = [];
                $scope.list = data;
            });
    };

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