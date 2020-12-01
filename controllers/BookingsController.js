const Booking = require('./../models/Booking')
const Room = require('../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {
    try {
        await Booking.find({}).populate('account').populate({
            path: 'room',
            populate: {
                path: 'classType'
            }
        }).exec((error, bookings) => {
            if (error) return response.redirect('back')
            response.render('admin/bookings/index', {
                layout: 'layouts/admin',
                title: 'Booking List',
                bookings: bookings,
                header: 'Bookings'
            })
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
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

async function edit(request, response) {
    try {
        await Booking.findOne({ _id: request.params.id }, (error, booking) => {
            if (error) return response.redirect('back')
            response.render('admin/bookings/update', {
                layout: 'layouts/admin',
                title: 'Update Booking',
                header: 'Update Booking',
                booking: booking
            })
        })
    } catch (error) {
        console.log(error);
    }
}
async function store(request, response) {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        const price = request.body.price.replace(',', '').split('.')[0]
        const booking = {
            checkIn: new Date(bookingDate[0]).toLocaleDateString(),
            checkOut: new Date(bookingDate[1]).toLocaleDateString(),
            account: request.user._id,
            room: request.body.room,
            total: calculateTotal(bookingDate, price)
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
        console.log(error);
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
            }
        }).exec((error, result) => {
            if (error) {
                console.log(error)
                return response.status(500).json({ message: "Server Error." })
            }
            result.rooms = result.rooms.filter((room) => {
                if (!room.bookings.length) return room
                var available = false;
                for (let i = 0; i < room.bookings.length; i++) {
                    if (!(new Date(room.bookings[i].checkIn).toLocaleDateString() <= new Date(bookingDate[0]).toLocaleDateString() &&
                            new Date(room.bookings[i].checkOut).toLocaleDateString() >= new Date(bookingDate[0]).toLocaleDateString())) {
                        available = true
                        break
                    }
                }
                if (available) return room

            })
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
}

function calculateTotal(date, price) {
    console.log(date);
    let [checkIn, checkOut] = date
    checkIn = new Date(checkIn).getTime()
    checkOut = new Date(checkOut).getTime()
    let differ_in_days = (checkOut - checkIn) / (1000 * 3600 * 24)
    return differ_in_days < 1 ? price : price * differ_in_days;
}
module.exports = {
    index,
    edit,
    store,
    update,
    destroy,
    create,
    check
}