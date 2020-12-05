const layout = 'layouts/admin'
const Booking = require('../models/Booking')
const Account = require('../modules/account/models/Account')
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
        const clients = await Account.find({ accountType: "client" }).count();
        let start = new Date()
        start.setDate(1)
        let end = new Date()
        end.setDate(5)

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
        const pending = await Booking.find({ status: "pending" }).count()
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
        var sum = { total_bookings: 0 }
        if (rooms.length) {
            sum = rooms.reduce((a, b) => ({ total_bookings: a.total_bookings + b.total_bookings }))
        }

        response.render('admin/dashboard', {
            layout: layout,
            header: 'Dashboard',
            rooms: rooms,
            monthly: formatMoney(monthly[0].total),
            yearly: formatMoney(yearly[0].total),
            sum: sum.total_bookings || 0,
            user: request.user,
            clients: clients,
            pending: pending,
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
}

function formatMoney(total) {
    return Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, }).format(total)
}
async function getMonthlyIncome(request, response) {

    try {
        let months = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
            7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
        }
        let incomes = {}
        let date = new Date()
        let monthly = await Booking.aggregate([{
            $match: {
                checkIn: {
                    $gt: new Date(date.getFullYear(), 1, 1)
                },
                status: "confirmed"
            },

        }, {
            $group: {
                _id: {
                    $month: "$checkIn"
                },
                total: { "$sum": "$total" }
            },

        }, { $sort: { _id: 1 } }])      
        var keys = Object.keys(months);
        for (let index = 0; index < keys.length; index++) {
            for (let j = 0; j < monthly.length; j++) {
                if(monthly[j]._id == keys[index]){
                    incomes[keys[index]] = monthly[j].total
                    break
                }
                incomes[keys[index]] = 0
            }
        }

        return response.json({
            data: incomes
        })
    } catch (error) {
        console.log(error);
        return response.json({
            error: error
        })
    }
}

module.exports = {
    dashboard,
    getMonthlyIncome
}