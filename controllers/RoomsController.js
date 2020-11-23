const layout = 'layouts/admin'
async function all(request, response) {
    response.render('admin/rooms/index', {
        layout: layout,
        header: 'Rooms'
    })
}

async function available(request, response) {
    response.render('admin/rooms/available', {
        layout: layout,
        header: 'Available Rooms'
    })
}

async function reserved(request, response) {
    response.render('admin/rooms/reserved', {
        layout: layout,
        header: 'Reserved Rooms'
    })
}

async function history(request, response) {
    response.render('admin/rooms/history', {
        layout: layout,
        header: 'Rooms History'
    })
}

async function pendings(request, response) {
    response.render('admin/rooms/pendings', {
        layout: layout,
        header: 'Pending Rooms'
    })
}

module.exports = {
    all,
    available,
    reserved,
    history,
    pendings
}