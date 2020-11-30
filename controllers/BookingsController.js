const Booking = require('./../models/Booking')
const Room = require('../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {

}

async function create(request, response) {
    try {
        await ClassType.findOne({ _id: request.params.id }, (error, classType) => {
            if (error) return response.redirect('back')
            var price = Intl.NumberFormat("en-PH", {
                minimumFractionDigits: 2,
            }).format(classType.price)
            response.render('pages/bookings/create', {
                layout: 'layouts/app',
                title: 'Create Booking',
                classType: classType,
                price: price
            })
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }

}

async function show(request, response) {

}
async function store(request, response) {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        const booking = {
            checkIn: bookingDate[0],
            checkOut: bookingDate[1],
            account: request.user._id,
            room: request.body.room
        }
        await Room.findOne({ _id: request.body.room }, (error, room) => {
            if (!error) {
                new Booking(booking).save((error, booking) => {
                    if (error) return response.redirect('back')
                    room.bookings.push(booking)
                    room.save()
                    response.redirect('back')
                    console.log('booking save');
                })
            }
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
        const bookingDate = request.query.bookingDate.replace(/ /g, '').split('/')
        await ClassType.findOne({ _id: request.params.id }).populate({
            path: 'rooms',
            model: 'Room',
            populate: {
                path: 'bookings',
                model: 'Booking',
                match: {
                    checkIn: {
                        $lt: bookingDate[0]
                    },
                    checkOut: {
                        $gt: bookingDate[1]
                    }
                }
            }
        }).exec((error, result) => {

            console.log(result);
            response.status(200).json({
                classType: result
            })
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error
        })
    }
    // {
    //     path: 'rooms',
    //     match: {
    //         checkIn: {
    //             $gte: bookingDate[0],
    //             $lte: bookingDate[1]
    //         },
    //         checkOut: {
    //             $gte: bookingDate[0],
    //             $lte: bookingDate[1]
    //         },
    //         status: "confirmed"
    //     }
    // }

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    create,
    check
}