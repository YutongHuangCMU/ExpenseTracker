var ExpenseModel = require("../models/expenseModel");

/**
 * The function is used to log the expense into the database
 * @param username username
 * @param amount amount
 * @param date date
 * @param des des
 * @param callback
 */
var logExpense = function (username, amount, date, des, callback) {
    if (amount == 0) {
        callback("Amount cannot be 0!", null);
    }
    var newDate = new Date(date);
    var newExpense = new ExpenseModel({
        username: username,
        amount: amount,
        date: newDate,
        description: des
    });
    newExpense.save();
    callback(null, "Log Expense Successful!");
};

/**
 * The function is used to get the logs for a user from database
 * @param username username
 * @param callback
 */
var getMyLogs = function (username, callback) {
    ExpenseModel.find({username : username}, function (err, logs) {
        callback(logs);
    });
};

/**
 * The function is used to delete a record in database
 * @param log log
 * @param callback
 */
var deleteLog = function (log, callback) {
    ExpenseModel.remove({_id: log._id}, function (err) {
        if (err) {
            callback(err, null);
        }
    });
    callback(null, "success");
};

/**
 * The function is used to update the expense in the database
 * @param _id _id
 * @param amount amount
 * @param date date
 * @param des des
 * @param callback
 */
var updateExpense = function (_id, amount, date, des, callback) {
    var newDate = new Date(date);
    ExpenseModel.findOneAndUpdate({_id: _id}, {
        amount: amount,
        date: newDate,
        description: des
    }, {upsert:true}, function(err, doc){
        if (err) {
            callback("cannot find the record");
        } else {
            callback(null);
        }
    });
};

/**
 * The funcion is used to get all logs for admin
 * @param callback
 */
var getAllLogs = function (callback) {
    ExpenseModel.aggregate([
        {
            $group: {
                _id: "$username",
                logs: {
                    $push: "$$ROOT"
                }
            }
        }
    ] , function(err, data) {
        callback(data);
    });
};

module.exports = {
    logExpense: logExpense,
    getMyLogs: getMyLogs,
    deleteLog: deleteLog,
    updateExpense: updateExpense,
    getAllLogs: getAllLogs
};