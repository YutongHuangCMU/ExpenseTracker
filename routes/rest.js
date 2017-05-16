var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var userService = require("../services/userService");

var jsonParser = bodyParser.json();

router.post("/signup", jsonParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var accessCode = req.body.accessCode;
    var isAdmin = req.body.isAdmin;
    userService.signup(username, password, accessCode, isAdmin, function (err, token) {
        res.json({
            err: err,
            token: token
        });
    });
});

router.post("/login", jsonParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.isAdmin;
    userService.login(username, password, isAdmin, function (err, token) {
        res.json({
            err: err,
            token: token
        });
    });
});

module.exports = router;