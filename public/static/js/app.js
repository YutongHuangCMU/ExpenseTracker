var app = angular.module("expenseTracker", ["ngRoute", "ngResource", "chart.js", 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl:"./public/views/home.html",
            controller: "homeController"
        })
        .when("/report", {
            templateUrl:"./public/views/report.html",
            controller: "reportController"
    })
});