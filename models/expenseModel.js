var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ExpenseSchema = new schema({
    username: String,
    date: String,
    time: String,
    amount: Number,
    description: String
});

var expenseModel = mongoose.model("ExpenseModel", ExpenseSchema);

module.exports = expenseModel;