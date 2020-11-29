module.exports = async(request, response, next) => {
    try {
        const bookingDate = request.body.bookingDate.replace(/ /g, '').split('/')
        await Booking.findOne({
            room: request.body.room_id,

        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
}