const Account = require('./../../account/models/Account')
const jwt = require('jsonwebtoken')

function login(request, response) {
    response.render('auth/login', {
        layout: 'layouts/auth'
    })
}

function register(request, response) {
    response.render('auth/register', {
        layout: 'layouts/auth'
    })
}

async function authenticate(request, response) {
    try {

        await Account.find({
            email: request.body.email,
            password: request.body.password
        }, (err, result) => {
            if (err) {
                return response.redirect('/auth/login', 403)
            }
            if (!result.length) {
                return response.redirect('/auth/login')
            }
            // const accessToken = jwt.sign(result[0].toString(), process.env.ACCESS_TOKEN)
            // response.set('Authorization', 'Bearer ' + accessToken)
            if (result[0].accountType == "admin") {
                return response.redirect('/admin/dashboard')
            }
            response.redirect('/')
        })
    } catch (error) {
        console.log(error);
        response.status(500)
    }
}

module.exports = {
    login,
    register,
    authenticate
}