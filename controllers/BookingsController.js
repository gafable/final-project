const Booking = require('./../models/Booking')
const Room = require('../models/Room')
const ClassType = require('./../models/ClassType')

async function index(request, response) {
    try {
          await Booking.find({}).populate('account').populate({
              path : 'room',
              populate : {
                  path : 'classType'
              }
          }).exec((error,bookings)=>{
            if (error) return response.redirect('back')
            response.render('admin/bookings/index',{
                layout : 'layouts/admin',
                title : 'Booking List',
                bookings : bookings,
                header : 'Bookings'
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
        await Booking.findOne({_id:request.params.id},(error,booking)=>{
            if (error) return response.redirect('back')
            response.render('admin/bookings/update',{
                layout: 'layouts/admin',
                title: 'Update Booking',
                header : 'Update Booking',
                booking : booking
            })
        })
    } catch (error) {
        console.log(error);
    }
}
async function store(request, response) {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        const booking = {
            checkIn: bookingDate[0],
            checkOut: bookingDate[1],
            account: request.user._id,
            room: request.body.room,
            
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
                model: 'Booking'
            }
        }).exec((error, result) => {
            if(error) return response.status(500).json({message : "Server Error."})
            result.rooms = result.rooms.filter((room)=>{
                if(!room.bookings.length) return room
                var available = false;
                for(let i = 0; i < room.bookings.length ;i++ ){
                    if( ! (new Date(room.bookings[i].checkIn).getTime() + 8.64e+7  <= new Date(bookingDate[0]).getTime()) || 
                        ! (new Date(room.bookings[i].checkOut).getTime() + 8.64e+7>= new Date(bookingDate[0]).getTime()))
                    {
                        available = true
                        break
                    }
                }
                 if(available) return room
              
            })
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

module.exports = {
    index,
    edit,
    store,
    update,
    destroy,
    create,
    check
}