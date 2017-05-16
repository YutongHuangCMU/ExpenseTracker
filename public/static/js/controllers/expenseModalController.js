var app = angular.module('expenseTracker');

app.controller('expenseModalController', function ($scope, $http, $uibModalInstance, log, $location) {
    $scope.log = log;
    console.log(log.description);
    $scope.date = new Date(log.date);
    var time = new Date();
    time.setHours(log.time.split(":")[0]);
    time.setMinutes(log.time.split(":")[1]);
    $scope.time = time;
    $scope.ok = function () {
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
        $http.post("api/v1/updateExpense", {
            _id: log._id,
            amount: $scope.amount,
            date: date,
            time: time,
            des: $scope.des
        })
            .success(function (data) {
                if (data.err) {
                    $scope.error = data.err;
                } else {
                    $uibModalInstance.close();
                    $location.path("/");
                    getMyLogs();
                }
            })
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    var getMyLogs = function () {
        $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || "{}");
        $http.get("api/v1/getMyLogs")
            .success(function (data) {
                $scope.list = [];
                $scope.list = data;
            });
    };
});