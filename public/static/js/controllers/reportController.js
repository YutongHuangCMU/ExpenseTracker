var app = angular.module('expenseTracker');

app.controller("reportController", function ($window, $scope, $http) {
    $scope.username = JSON.parse($window.sessionStorage.username || '{}');
    $scope.getTime = function(info) {
        $scope["lineData"] = [];
        $scope["lineLabels"] = [];
        $scope.time = info;
        $http.get("/api/v1/report/" + $scope.username + "/" + info)
            .success(function(data) {
                data.forEach(function(item) {
                    var legend = "";
                    if (info === "hour") {
                        if (item._id.hour < 10) {
                            item._id.hour = "0" + item._id.hour;
                        }
                        legend = item._id.month + "/" + item._id.day + "/" + item._id.year + " " + item._id.hour;
                    } else if (info === "day") {
                        legend = item._id.month + "/" + item._id.day + "/" + item._id.year;
                    } else if (info === "week") {
                        legend = item._id.year + " week" + item._id.week;
                    } else if (info === "month") {
                        legend = item._id.month + "/" + item._id.year;
                    } else if (info === "year") {
                        legend = item._id.year;
                    }
                    $scope["lineData"].push(item.sum);
                    $scope["lineLabels"].push(legend);
                });
            });
    };
    $scope.getTime("hour");
    $scope.total = 0;


    $scope.calculate = function () {
        var newDate1 = new Date($scope.date1);
        var newDate2 = new Date($scope.date2);
        $http.get("api/v1/report/" + $scope.username + "/" + newDate1 + "/" + newDate2)
            .success(function (data) {
                if (data.data) {
                    $scope.total = data.data;
                }
            });
    };
});