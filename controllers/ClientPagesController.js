async function index(request, response) {
    response.render('pages/index', {
        title: 'HighQua HomePage'
    })
}

async function rooms(request, response) {
    response.render('pages/rooms/roomlist', {
        title: 'HighQua Room Lists'
    })
}

async function blogs(request, response) {
    response.render('pages/blog', {
        title: 'HighQua Blog'
    })
}

async function contact(request, response) {
    response.render('pages/contact', {
        title: 'HighQua Contact'
    })
}
async function services(request, response) {
    response.render('pages/services', {
        title: 'HighQua Services'
    })
}

async function suite(request, response) {
    response.render('pages/suite', {
        title: 'HighQua Suite'
    })
}

async function reservation(request, response) {
    response.render('pages/reservation', {
        title: 'HighQua Reservation'
    })
}

module.exports = {
    index,
    rooms,
    blogs,
    contact,
    services,
    suite,
    reservation
}