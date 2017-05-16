var app = angular.module("expenseTracker", ["ngRoute", "ngResource", "chart.js", 'ui.bootstrap']);

//the angular app configuration
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
        .when("/logs", {
            templateUrl:"./public/views/logs.html",
            controller: "logController"
        })
});