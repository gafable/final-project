const Room = require('./../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {
    response.render('pages/index', {
        title: 'HighQua HomePage',
        user: request.user
    })
}

async function rooms(request, response) {
    try {
        await ClassType.find({ type: "room" }, (error, classTypes) => {
            console.log(rooms);
            if (error) return response.redirect('back')
            response.render('pages/rooms/index', {
                title: 'HighQua Room Lists',
                classTypes: classTypes,
                user: request.user
            })
        })
    } catch (error) {
        console.log(error);
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
                user: request.user
            })
            console.log(classTypes)
        })
    } catch (error) {
        console.log(error);
    }
}

async function availableRooms(request, response) {

    try {
        await Room.find({}).populate({
            path: 'classType',
            match: {
                type: "suite"
            },
            model: "ClassType"
        }).exec((error, rooms) => {
            if (error) return response.redirect('back')
            response.render('pages/suite', {
                title: 'HighQua Suite Lists',
                rooms: rooms,
                user: request.user
            })
        })
    } catch (error) {
        console.log(error);
    }

}

async function blogs(request, response) {
    response.render('pages/blog', {
        title: 'HighQua Blog',
        user: request.user
    })
}

async function contact(request, response) {
    response.render('pages/contact', {
        title: 'HighQua Contact',
        user: request.user
    })
}
async function services(request, response) {
    response.render('pages/services', {
        title: 'HighQua Services',
        user: request.user
    })
}

async function reservation(request, response) {
    response.render('pages/reservation', {
        title: 'HighQua Reservation',
        user: request.user
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
    availableRooms,
}