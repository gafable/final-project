const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    let accessToken = request.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken || Object.keys(accessToken).length === 0 && accessToken.constructor === Object) {
        return response.status(401).redirect('/auth/login')
    }

    try {
        request.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (error) {
        console.log(error.name + ' : ' + error.message);
        return response.redirect('/auth/login')
    }
}