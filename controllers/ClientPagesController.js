const Room = require('./../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {
    response.render('pages/index', {
        title: 'HighQua HomePage',
        user: request.user,
        routeIs: 'home'
    })
}

async function rooms(request, response) {
    try {
        await ClassType.find({ type: "room" }, (error, classTypes) => {
            if (error) return response.redirect('back')
            response.render('pages/rooms/index', {
                title: 'HighQua Room Lists',
                classTypes: classTypes,
                user: request.user,
                routeIs: 'rooms'
            })
        })
    } catch (error) {
        return response.redirect('back')
    }
}

async function suite(request, response) {
    try {
        await ClassType.find({ type: "suite" }, (error, classTypes) => {
            console.log(suite);
            if (error) return response.redirect('back')
            response.render('pages/suite', {
                title: 'HighQua Suite',
                classTypes: classTypes,
                user: request.user,
                routeIs: 'suites'
            })
        })
    } catch (error) {
       return response.redirect('back')
    }
}

async function blogs(request, response) {
    response.render('pages/blog', {
        title: 'HighQua Blog',
        user: request.user,
        routeIs: 'blogs'
    })
}

async function contact(request, response) {
    response.render('pages/contact', {
        title: 'HighQua Contact',
        user: request.user,
        routeIs: 'contact'
    })
}
async function services(request, response) {
    response.render('pages/services', {
        title: 'HighQua Services',
        user: request.user,
        routeIs: 'services'
    })
}

async function reservation(request, response) {
    response.render('pages/reservation', {
        title: 'HighQua Reservation',
        user: request.user,
        routeIs: 'reservation'
    })
}

module.exports = {
    index,
    rooms,
    blogs,
    contact,
    services,
    suite,
    reservation,
}