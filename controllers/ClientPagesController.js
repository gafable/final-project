const Room = require('./../models/Room')

async function index(request, response) {
    response.render('pages/index', {
        title: 'HighQua HomePage'
    })
}

async function rooms(request, response) {
    try {
        await Room.find({}).populate({
            path: 'classType',
            match: {
                type: "room"
            },
            model: "ClassType"
        }).exec((error, rooms) => {
            console.log(rooms);
            if (error) return response.redirect('back')
            response.render('pages/rooms/index', {
                title: 'HighQua Room Lists',
                rooms: rooms.filter(room => room.classType != null)
            })
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
                    rooms: rooms
                })
            })
        } catch (error) {
            console.log(error);
        }
    
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
async function profile(request, response) {
    response.render('pages/client-profile', {
        layout: 'layouts/client',
        header: 'Profile info '
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
    profile
}