const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    if (req.url.includes('/auth/')) {
      next();
      return;
    }
    let token = req.get("authorization");

    if (!token || !req.body.facultyEmail) {
      return res.status(403).json({
        Error: "Access Denied",
        ERR_CODE: "JWT_ERROR",
        status: false
      });
    }

    token = token.slice(7); // Remove bearer

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          Error: "Access Denied",
          ERR_CODE: "JWT_ERROR",
          status: false
        });
      } else {
        // Provided token is not of current user
        if (req.body.facultyEmail !== decoded.faculty.email) {
          return res.status(403).json({
            Error: "Access Denied",
            ERR_CODE: "JWT_ERROR",
            status: false
          });
        }
        req.data = decoded;
        next();
      }
    });
  }
};

