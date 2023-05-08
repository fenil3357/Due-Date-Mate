var express = require("express");
var router = express.Router();

router.getRandomCode = function (err, response) {
  //ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
  var charSet = "0123456789";
  var randomString = "";
  for (var i = 0; i < 6; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

router.addColumnValue = function (dataJson, ColumnName, ColumnValue) {
  if (ColumnValue == null) {
    ColumnValue = "[^#NULL#^]";
  } else {
    ColumnValue = ColumnValue.toString().replace("'", "''");
  }
  return dataJson + ColumnName + "[#^#]" + ColumnValue + "|#^#|";
};

router.isEmpty = function (value) {
  if (value == undefined || value == null || value == "") {
    return true;
  } else {
    return value.trim() == "";
  }
};

router.formatDate = function (date) {
  return moment(new Date(date)).add(1, "d").toDate();
};

router.getActiveStatus = function () {
  return "Active";
};

router.getPendingStatus = function () {
  return "Pending";
};

router.getDeleteStatus = function () {
  return "Delete";
};

router.getInactiveStatus = function () {
  return "Inactive";
};

router.encrypt = function (text) {
  var crypted = SHA256(text);
  return crypted.toString();
};

router.encryptedString = function (text) {
  var mykey = crypto.createCipher("aes-128-cbc", "answer");
  var mystr = mykey.update(text, "utf8", "hex");
  mystr += mykey.final("hex");
  return mystr;
};

router.decryptedString = function (text) {
  try {
    var mykey = crypto.createDecipher("aes-128-cbc", "answer");
    var mystr = mykey.update(text, "hex", "utf8");
    mystr += mykey.final("utf8");
    return mystr;
  } catch (err) {
    // UtilityModel.SaveException(err, 'decryptedString');
    return err;
  }
};

router.isEmpty2 = function (value) {
  if (value === undefined || value === null || value === "") {
    return true;
  } else {
    if (typeof value === "string") {
      return value.trim() == "";
    } else {
      return false;
    }
  }
};

router.responseCode = {
  200: 200, // OK
  201: 201, // Created
  204: 204, // No Content
  304: 304, // Content Not Modified
  400: 400, // Bad Request
  401: 401, // Unauthorized
  403: 403, // Forbidden
  404: 404, // Not Found
  409: 409, // Conflict
  422: 422, // Validation Errors
  500: 500, // Internal Server Error
};

router.messages = {
  pageNotFound:
    "The page or data you are requesting is not available on this server.",
  internalServerError: "Internal server error please try after sometime",
  unauthorizedAccess: "Unauthorized access to this module",
  logout: "Logged out successfully",
  invalidRefreshToken: "Invalid refresh token",
  mailSent: "Mail sent successfully",
  passwordChange: "Password changed successfully",
  emailChange: "Email changed successfully",
  tokenExpired: "Token is invalid or expired",
  defaultSuccessMessage: "Response sent successfully",
  defaultErrorMessage: "Something went wrong",
  loginMessage: "User successfully logged in.",
  deleteMessage: "Record deleted successfully.",
  invalidUser: "Invalid user access",
};

module.exports = router;
