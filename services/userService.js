var bcrypt = require("bcrypt-nodejs");
var UserModel = require("../models/userModel");
var uuid = require("node-uuid");
var jwt = require("jsonwebtoken");

var correctAccessCode = process.env.ACCESSCODE;
var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var redisClient = redis.createClient(port, host);


var salt = bcrypt.genSaltSync(10);

var signup = function (username, password, accessCode, isAdmin, callback) {
    bcrypt.hash(password, salt, null, function (err, hash) {
        UserModel.findOne({username: username}, function (err, user) {
            if (user) {
                callback("The username is not available!", null);
            } else {
                if (isAdmin) {
                    if (correctAccessCode === accessCode) {
                        var newUser = new UserModel({
                            username: username,
                            hashedPassword: hash,
                            isAdmin: isAdmin
                        });
                        newUser.save();
                    } else {
                        callback("The access code is incorrect!", null);
                    }
                } else {
                    var newUser = new UserModel({
                        username: username,
                        hashedPassword: hash,
                        isAdmin: isAdmin
                    });
                    newUser.save();
                }
                generateToken(username, function (token) {
                    callback(null, token);
                })
            }
        });
    });
};

var login = function (username, password, isAdmin, callback) {
    UserModel.findOne({username: username, isAdmin: isAdmin}, function (err, user) {
        if (user) {
            bcrypt.compare(password, user.hashedPassword, function (err, res) {
                if (res) {
                    generateToken(username, function (token) {
                        callback(null, token);
                    });
                } else {
                    callback("Either username or password is incorrect!", null);
                }
            });
        } else {
            callback("Either username or password is incorrect!", null);
        }
    })
};

function generateToken (username, callback) {
    redisClient.get("jwtKey", function (err, secretKey) {
        if (secretKey == null) {
            secretKey = uuid.v1();
            redisClient.set("jwtKey", secretKey);
        }
        jwt.sign({username: username}, secretKey, {expiresIn : '1h'}, function (err, token) {
            callback(token);
        });
    });
}

var decodeToken = function (token, callback) {
    if (token == null) {
        callback("Token is null", null);
    } else {
        redisClient.get('jwtKey', function (err, secretKey) {
            if (secretKey == null) {
                callback("Secret key is null", null);
            } else {
                jwt.verify(token, secretKey, function (err, decoded) {
                    if (err) {
                        callback("Error in verifying token", null);
                    } else {
                        var username = decoded.username;
                        if (username == null) {
                            callback("User not found", null);
                        } else {
                            callback(null, username);
                        }
                    }
                });
            }
        });
    }
};

module.exports = {
    signup:signup,
    login: login,
    decodeToken: decodeToken
};