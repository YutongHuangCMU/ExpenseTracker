var app = angular.module('expenseTracker');

app.controller('expenseModalController', function ($window, $scope, $http, $uibModalInstance, log, $location) {
    $scope.log = log;
    console.log(log.description);
    $scope.date = new Date(log.date);
    $scope.ok = function () {
        $http.post("api/v1/updateExpense", {
            _id: log._id,
            amount: $scope.amount,
            date: $scope.date,
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