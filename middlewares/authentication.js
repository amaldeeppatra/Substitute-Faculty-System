const {validateToken} = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch (error){}

        return next();
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/');
}

module.exports = {
    checkForAuthenticationCookie,
    ensureAuthenticated
};