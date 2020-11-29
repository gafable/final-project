const Booking = require('./../models/Booking')
const Room = require('../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {

}

async function create(request, response) {
    await Room.findOne({ _id: request.params.id }, (error, room) => {
        if (error) return response.redirect('back')
        var price = Intl.NumberFormat("en-PH", {
            minimumFractionDigits: 2,
        }).format(room.price)
        response.render('pages/bookings/create', {
            layout: 'layouts/app',
            title: 'Create Booking',
            room: room,
            price: price
        })
    })

}

async function show(request, response) {

}
async function store(request, response) {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        await ClassType.findOne({ _id: request })
        await new Booking(request.booking).save((error) => {
            if (error) return response.redirect('back')
            response.redirect('back')
            console.log('booking save');
        })
    } catch (error) {

    }

}



async function update(request, response) {

}

async function destroy(request, response) {

}

async function check(request, response) {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        await ClassType.find({ _id: request.params.id }).populate({
            path: 'rooms',
            match: {
                checkIn: {
                    $gte: bookingDate[0],
                    $lte: bookingDate[1]
                },
                checkOut: {
                    $gte: bookingDate[0],
                    $lte: bookingDate[1]
                },
                status: "confirmed"
            }
        })
    } catch (error) {

    }

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    create
}