var app = angular.module("expenseTracker", ["ngRoute", "ngResource", 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl:"./public/views/home.html",
            controller: "homeController"
        });
});