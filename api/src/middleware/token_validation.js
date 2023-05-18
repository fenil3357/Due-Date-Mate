const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    if(req.url.includes('/auth/') || req.url.includes('/group/')) {
      next();
      return;
    }
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            Error : "Access Denied",
            ERR_CODE: "JWT_ERROR",
            status: false
          });
        } else {
          req.data = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({
        Error : "Access Denied",
        ERR_CODE: "JWT_ERROR",
        status: false
      });
    }
  }
};

