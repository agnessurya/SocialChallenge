const jwt = require("jsonwebtoken");

function changetopayload(token) {
   return jwt.verify(token, "SECRET")
}

function maketoken(obj) {
    return  jwt.sign(obj,"SECRET")
}

module.exports = {changetopayload , maketoken}