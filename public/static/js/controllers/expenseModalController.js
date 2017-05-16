var app = angular.module('expenseTracker');

app.controller('expenseModalController', function ($window, $scope, $http, $uibModalInstance, log, $location) {
    $scope.log = log;
    console.log(log._id);
    $scope.date = new Date(log.date);
    //triggered when the submit button is clicked
    $scope.ok = function () {
        $http.post("api/v1/updateExpense", {
            _id: log._id,
            amount: $scope.amount,
            date: $scope.date,
            des: $scope.des
        })
            .success(function (data) {
                console.log(data);
                if (data.err) {
                    $scope.error = data.err;
                } else {
                    $uibModalInstance.close();
                    $location.path("/");
                }
            })
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});