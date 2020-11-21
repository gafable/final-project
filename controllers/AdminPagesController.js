const layout = 'layouts/admin'

function dashboard(request, response) {
    response.render('admin/dashboard', {
        layout: layout
    })
}

module.exports = {
    dashboard
}