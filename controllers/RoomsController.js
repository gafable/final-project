const layout = 'layouts/admin'
const Room = require('./../models/RoomModel')
const parseRequestBody = require('./../utilities/parseRequestBody')

async function all(request, response) {
    try {
        await Room.find({}, (error, result) => {
            if (error) {
                return response.status(500).json({
                    error: error
                })
            }
            response.render('admin/rooms/index', {
                layout: layout,
                header: 'Rooms',
                rooms: result
            })
        })
    } catch (error) {
        console.log(error);
    }
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

async function checkAvailability(request, response) {
    console.log(request.query.checkIn);
    console.log(request.query.checkOut);
    response.redirect('/rooms')
}

async function create(request, response) {
    try {
        console.log(request.file);
        const room = {
            no: request.body.no,
            imageUrl: request.file.destination + '/' + request.file.filename,
            floorNo: request.body.floorNo,
            type: request.body.type,
            classType: request.body.classType,
            price: request.body.price,
            status: request.body.status,
            description: request.body.description,
            features: request.body.features
        }
        await new Room(room).save().then((room) => {
            console.log(room);
            response.redirect('/rooms/all')
        }).catch((error) => {
            console.log(error);
        })

    } catch (error) {
        console.log(error);
    }
}

async function show(request, response) {
    await Room.findOne({ _id: request.params.id }, (error, room) => {
        if (error) {
            return response.status(404).json({
                error: error
            })
        }
        response.status(200).json({
            room: room
        })
    })
}

async function edit(request, response) {
    await Room.findOne({ _id: request.params.id }, (error, room) => {
        if (error) {
            return response.render('admin/rooms/update', {
                layout: layout,
                header: 'Update Room',
                errors: error
            })
        }
        console.log(room);
        response.render('admin/rooms/update', {
            layout: layout,
            header: 'Update Room',
            room: room
        })
    })
}
async function update(request, response) {
    const roomToUpdate = parseRequestBody(request.body)
    await Room.updateOne({ _id: request.params.id }, roomToUpdate, (error, result) => {
        if (error) {
            response.render('admin/rooms/update', {
                layout: layout,
                header: 'Update Room',
                room: new Room(),
                error: error
            })
        }
        response.redirect('/rooms/all')
    })
}

module.exports = {
    all,
    available,
    reserved,
    history,
    pendings,
    create,
    edit,
    update,
    show,
    checkAvailability
}