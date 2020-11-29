module.exports = (request, response, next) => {

    request.user.accountType === "admin" ? next() : response.redirect('back')

}