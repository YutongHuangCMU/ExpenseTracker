var mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSchema = new schema({
    username: String,
    hashedPassword: String,
    isAdmin: Boolean
});

var userModel = mongoose.model("UserModel", UserSchema);

module.exports = userModel;