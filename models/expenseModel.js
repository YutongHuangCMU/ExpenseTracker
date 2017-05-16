var mongoose = require("mongoose");
const timeZone = require('mongoose-timezone');

var schema = mongoose.Schema;

var ExpenseSchema = new schema({
    username: String,
    date: {
        type:Date,
        default: Date.now
    },
    amount: Number,
    description: String
});

ExpenseSchema.plugin(timeZone, {});
var expenseModel = mongoose.model("ExpenseModel", ExpenseSchema);

module.exports = expenseModel;