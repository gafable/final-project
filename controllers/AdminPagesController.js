const layout = 'layouts/admin'

async function dashboard(request, response) {
    response.render('admin/dashboard', {
        layout: layout,
        header: 'Dashboard'
    })
}

module.exports = {
    dashboard
}