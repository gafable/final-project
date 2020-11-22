const layout = 'layouts/admin'

async function dashboard(request, response) {
    response.render('admin/dashboard', {
        layout: layout
    })
}

module.exports = {
    dashboard
}