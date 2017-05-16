var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var userService = require("../services/userService");
var expenseService = require("../services/expenseService");
var reportService = require("../services/reportService");


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

router.post("/logExpense", jsonParser, function (req, res) {
    var username = req.body.username;
    var amount = req.body.amount;
    var date = req.body.date;
    var des = req.body.des;
    expenseService.logExpense(username, amount, date, des, function (err, mes) {
        res.json({
            err: err,
            res: mes
        });
    });
});

router.post("/updateExpense", jsonParser, function (req, res) {
    var _id = req.body._id;
    var amount = req.body.amount;
    var date = req.body.date;
    var des = req.body.des;
    expenseService.updateExpense(_id, amount, date, des, function (err, mes) {
        res.json({
            err: err,
            res: mes
        });
    });
});

router.get("/getMyLogs", jsonParser, function (req, res) {
    var authHeader = req.headers['authorization'];
    if (authHeader) {
        var token = getToken(authHeader);
        if (token == null) {
            res.json([]);
            return;
        }
        userService.decodeToken(token, function (err, username) {
            if (err) {
                res.json([]);
            } else {
                expenseService.getMyLogs(username, function (logs) {
                    res.json(logs);
                });
            }
        });
    } else {
        res.json([]);
    }
});

router.get("/allLogs", jsonParser, function (req, res) {
    expenseService.getAllLogs(function (allList) {
        res.json(allList);
    });
});


router.post("/deleteLog", jsonParser, function (req, res) {
    var log = req.body.log;
    expenseService.deleteLog(log, function (err, mes) {
        res.json({
            err: err,
            res: mes
        });
    });
});

router.get("/report/:username/:date1/:date2", function(req, res) {
    console.log("enter");
    reportService.getReportIntervalTotal(req.params.username, req.params.date1, req.params.date2, function(err, data) {
        res.json({
            err: err,
            data: data
        });
    });
});

router.get("/report/:username/:info", function(req, res) {
    console.log("enter2");
    reportService.getReportDateTime(req.params.username, req.params.info, function(data) {
        res.json(data);
    });
});




function getToken(authHeader) {
    var splits = authHeader.split(' ');
    if (splits.length != 2) return null;
    return splits[1];
}

module.exports = router;