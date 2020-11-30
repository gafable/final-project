module.exports = async(request, response, next) => {
    try {

        await Booking.findOne({
            room: request.body.room_id,

        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }
}