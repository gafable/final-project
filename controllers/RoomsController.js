const layout = 'layouts/admin'
const ClassType = require('../models/ClassType')
const Room = require('./../models/Room')
const parseRequestBody = require('./../utilities/parseRequestBody')

async function all(request, response) {
    try {
        await Room.find({ classType: { $ne: null } }).populate('classType').exec((error, rooms) => {
            if (error) {
                return response.redirect('back')
            }
            rooms = rooms.filter(room => room.classType)
            response.render('admin/rooms/index', {
                layout: layout,
                header: 'Rooms',
                rooms: rooms,
                user: request.user
            })
        })
    } catch (error) {
        return response.redirect('back')
    }
}



async function history(request, response) {
    response.render('admin/rooms/history', {
        layout: layout,
        header: 'Rooms History',
        user:request.user
    })
}



async function create(request, response) {
    try {
        await ClassType.findOne({ _id: request.body.classType }, (error, classType) => {
            if (error) {
                return response.redirect('back')
            }
            new Room({
                no: request.body.no,
                floorNo: request.body.floorNo,
                classType: classType,
                status: request.body.status,
            }).save((error, room) => {
                if (!error) {
                    classType.rooms.push(room)
                    classType.save()
                    response.redirect('back')
                }
            })

        })
    } catch (error) {
        return response.redirect('back')
    }
}



async function edit(request, response) {
    try {
        await Room.findOne({ _id: request.params.id }, (error, room) => {
            if (error) {
                return response.redirect('back')
            }
            response.render('admin/rooms/update', {
                layout: layout,
                header: 'Update Room',
                room: room,
                user: request.user
            })
        })
    } catch (error) {
        return response.redirect('back')
    }

}
async function update(request, response) {
    try {
        await Room.updateOne({ _id: request.params.id }, parseRequestBody(request.body), (error, result) => {
            if (error) {
                return response.redirect('back')
            }
            response.redirect('/rooms/all')
        })
    } catch (error) {
        return response.redirect('back')
    }

}



module.exports = {
    all,
    history,
    create,
    edit,
    update,
}