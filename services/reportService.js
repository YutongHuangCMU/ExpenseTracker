var ExpenseModel = require("../models/expenseModel");

/**
 * The function is used to get logs based on timeline, according to the different criteria.
 * @param username username
 * @param info criteria
 * @param callback
 */
var getReportDateTime = function (username, info, callback) {
    var groupId = "";
    if (info === "hour") {
        groupId = {
            year: { $year : "$date" },
            month: { $month : "$date"},
            day: { $dayOfMonth : "$date"},
            hour: { $hour : "$date"}
        }
    } else if (info === "day") {
        groupId = {
            year: { $year : "$date" },
            month: { $month : "$date"},
            day: { $dayOfMonth : "$date"}
        }
    } else if (info === "week") {
        groupId = {
            year: { $year : "$date" },
            week: { $week : "$date"}
        }
    }else if (info === "month") {
        groupId = {
            year: { $year : "$date" },
            month: { $month : "$date"}
        }
    } else if (info === "year") {
        groupId = {
            year: { $year : "$date" }
        }
    } else {
        groupId = "$" + info;
    }

    ExpenseModel.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $sort: {
                date: -1
            }

        },
        {
            $group: {
                _id: groupId,
                sum: { $sum : "$amount" }
            }
        }
    ] , function(err, data) {
        callback(data);
    });
};

/**
 * The function is used to get logs between certain time range
 * @param username username
 * @param date1 start time
 * @param date2 end time
 * @param callback
 */
var getReportIntervalTotal = function (username, date1, date2, callback) {
    var newDate1 = new Date(date1);
    var newDate2 = new Date(date2);
    ExpenseModel.find({username: username}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        var total = 0;
        data.forEach(function (log) {
            if (log.date >= newDate1 && log.date <= newDate2) {
                total += log.amount;
            }
        });
        callback(null, total);

    });
};

module.exports = {
    getReportDateTime: getReportDateTime,
    getReportIntervalTotal: getReportIntervalTotal
};