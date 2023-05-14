const authService = require("../services/auth.service");

module.exports = (router) => {
    // sign up
    router.post("/auth/signup", authService.signUpService);

    // login
    router.post("/auth/login", authService.loginService);
}