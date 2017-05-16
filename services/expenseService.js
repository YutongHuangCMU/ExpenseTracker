var ExpenseModel = require("../models/expenseModel");

var logExpense = function (username, amount, date, time, des, callback) {
    if (amount == 0) {
        callback("Amount cannot be 0!", null);
    }
    var newExpense = new ExpenseModel({
        username: username,
        amount: amount,
        date: date,
        time: time,
        description: des
    });
    newExpense.save();
    callback(null, "Log Expense Successful!");
};

var getMyLogs = function (username, callback) {
    ExpenseModel.find({username : username}, function (err, logs) {
        callback(logs);
    });
};

var deleteLog = function (log, callback) {
    ExpenseModel.remove({_id: log._id}, function (err) {
        if (err) {
            callback(err, null);
        }
    });
    callback(null, "success");
};

var updateExpense = function (_id, amount, date, time, des, callback) {
    ExpenseModel.findOneAndUpdate({_id: _id}, {
        amount: amount,
        date: date,
        time: time,
        description: des
    }, {upsert:true}, function(err, doc){
        if (err) {
            callback("cannot find the record", null);
        }
        callback(null, "success");
    });
};

module.exports = {
    logExpense: logExpense,
    getMyLogs: getMyLogs,
    deleteLog: deleteLog,
    updateExpense: updateExpense
};