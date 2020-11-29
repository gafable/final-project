const Booking = require('./../models/Booking')
const Room = require('../models/Room')

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

    await new Booking(request.booking).save((error) => {
        if (error) return response.redirect('back')
        response.redirect('back')
        console.log('booking save');
    })
}



async function update(request, response) {

}

async function destroy(request, response) {

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    create
}