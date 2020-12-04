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
        let start = new Date()
        start.setDate(1)
        let end = new Date()
        end.setDate(5)
        // let bookings = await Booking.find({
        //     checkIn :{
        //         $gte: start,
        //         $lt: new Date(start.getFullYear(),start.getMonth()+1,0)
        //     }
        // })

        let monthly = await Booking.aggregate([{
            $match: {
                checkIn: {
                    $gte: start,
                    $lt: end
                },
                status: "confirmed"
            },

        }, {
            $group: {
                _id: {
                    $month: "$checkIn"
                },
                total: { "$sum": "$total" }
            }
        }])
        let yearly = await Booking.aggregate([{
            $match: {
                checkIn: {
                    $gte: start,
                    $lt: end
                },
                status: "confirmed"
            },

        }, {
            $group: {
                _id: {
                    $year: "$checkIn"
                },
                total: { "$sum": "$total" }
            }
        }])
        console.log(yearly);
        getMonthlyIncome()
        var sum = { total_bookings: 0 }
        if (rooms.length) {
            sum = rooms.reduce((a, b) => ({ total_bookings: a.total_bookings + b.total_bookings }))
        }

        response.render('admin/dashboard', {
            layout: layout,
            header: 'Dashboard',
            rooms: rooms,
            monthly: formatMoney(monthly[0].total),
            yearly : formatMoney(yearly[0].total),
            sum: sum.total_bookings || 0,
            user: request.user
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
}

function formatMoney(total) {
    return Intl.NumberFormat("en-PH", {minimumFractionDigits: 2,}).format(total)
}
async function getMonthlyIncome() {
    let months = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0,
    }
    let start = new Date()
        start.setDate(1)
        let end = new Date()
        end.setDate(5)
    let incomes = {}
    let monthly = await Booking.aggregate([{
        $match: {
            checkIn: {
                $gte: start,
                $lt: end
            },
            status: "confirmed"
        },

    }, {
        $group: {
            _id: {
                $month: "$checkIn"
            },
            total: { "$sum": "$total" }
        }
    }])
    const keys = Object.keys(months);
    for (let index = 0; index < keys.length; index++) {
        monthly.forEach((month)=>{
            month._id == keys[index] ?
            incomes[keys[index]] = month.total :
            incomes[keys[index]] = 0
        }) 
    }
   console.log(incomes);
}

module.exports = {
    dashboard
}