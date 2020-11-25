const Account = require('./../../account/models/Account')
const jwt = require('jsonwebtoken')

function login(request, response) {
    response.render('auth/login', {
        layout: 'layouts/auth',
        title: 'HighQua | Login'
    })
}

function register(request, response) {
    response.render('auth/register', {
        layout: 'layouts/auth',
        title: 'HighQua | Register'
    })
}

async function authenticate(request, response) {
    try {

        await Account.find({
            email: request.body.email,
            password: request.body.password
        }, (err, result) => {
            if (err || !result.length) {
                return response.redirect('/auth/login', 401)
            }
            const user = {
                _id: result[0]._id,
                username: result[0].username,
                email: result[0].email,
                password: result[0].password,
                accountType: result[0].accountType
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.REFRESH_TOKEN_LIFE
                })
                // Refresh token implementation

            response.cookie('jwt', accessToken, { httpOnly: true })

            if (user.accountType == "admin") {
                return response.redirect('/admin/dashboard')
            }
            response.redirect('/')
        })
    } catch (error) {
        console.log(error);
        response.status(500).render('/auth/login')
    }
}

async function logout(request, response) {
    response.cookie('jwt', {}, { httpOnly: true })
    response.redirect('/auth/login')
}

module.exports = {
    login,
    register,
    authenticate,
    logout
}