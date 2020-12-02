const layout = 'layouts/admin'
const Booking = require('../models/Booking')
const Room = require('./../models/Room')
const Romm = require('./../models/Room')
async function dashboard(request, response) {
    try {
        let rooms = await Room.aggregate([{
                "$lookup": {
                    "from": "bookings",
                    "localField": "bookings",
                    "foreignField": "_id",
                    "as": "room_bookings"
                },
            },
            {
                "$unwind": "$room_bookings"
            },
            {
                "$unwind": "$room_bookings"
            },
            {
                "$group": {
                    _id: "$no",
                    total_bookings: { "$sum": 1 }
                }
            },
            {
                "$sort": {
                    total_bookings: -1
                }
            }
        ])

        let bookings = await Booking.aggregate([{
            $match: {
                checkIn: {
                    $gte: new Date('2020-12-01')
                },
                status: "confirmed"
            },

        }, {
            $group: {
                _id: {
                    $month: "$checkIn"
                },
                total: { "$sum": 1 }
            }
        }])
        console.log(bookings);

        let sum = rooms.reduce((a, b) => ({ total_bookings: a.total_bookings + b.total_bookings }))
        response.render('admin/dashboard', {
            layout: layout,
            header: 'Dashboard',
            rooms: rooms,
            sum: sum.total_bookings
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
}

module.exports = {
    dashboard
}