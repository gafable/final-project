const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    try {
        const authorizationHeader = request.headers.authorization
        const token = authorizationHeader && authorizationHeader.split(' ')[1]
        if (token === null) {
            response.redirec('/auth/login')
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, result) => {
            if (error) {
                response.status(403).json({
                    message: "You unauthorize access."
                })
            }
            request.user = result;
            console.log(result);

            next()
        })

    } catch (error) {
        console.log(error);
    }
}