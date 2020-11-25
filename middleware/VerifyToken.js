const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    let accessToken = request.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        return response.redirect('/auth/login')
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (error) {
        console.log(error);
        return response.redirect('/auth/login')
    }
}