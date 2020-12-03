$('.more-info').click(function() {
    $id = $(this).closest('.hotel-content').find('input.room-id').val()
    $.get("/classtypes/show/" + $id, function(data, textStatus, jqXHR) {

        $modal = $('#classTypeModal');
        $modal.find('.title').text(data.classType.name);
        $modal.find('.image').css('background-image', `url(${data.classType.imageUrl})`);
        $modal.find('.subtitle').text(data.classType.name);
        $modal.find('#descriptionData').html(data.classType.description)
        let features = ""
        data.classType.features.forEach(feature => features += `<li>${feature} </li>`)
        $modal.find('#features').html(features)
        $modal.find('a.btn-luxe-primary').attr('href', '/bookings/classtypes/' + $id)
        $modal.find('.price>span').html(`&#x20b1; ${data.classType.price}/night`)
        $modal.modal('show');
        console.log(data.classType);

    });
})

$('button.check').click(function(e) {
    e.stopPropagation();
    $(this).find('i.fa').css('display', 'inline-block')
    $id = $('#classtype_id').val()
    $.ajax({
        type: "GET",
        url: "/bookings/check/" + $id,
        data: {
            bookingDate: $('#bookingDate').val()
        },
        success: function(data, status) {

            if (data.classType.rooms.length) {
                $('#room').val(data.classType.rooms[0]._id)
                $('.book-now').prop('disabled', false)
                $('.helper-msg').text(`There ${data.classType.rooms.length}  room available for this classtype you can book now.`)
                $('button.check').find('i.fa').css('display', 'none')
                $('button.check').css('display', 'none').fadeOut(5000);
                $('.book-now').addClass('btn-block').fadeIn(5000);
                $('button.check').find('i.fa').css('display', 'none')
            } else {
                $('.helper-msg').text(`There is no  room available for this classtype you can't book now. Try to change the date`)

                $('button.check').find('i.fa').css('display', 'none')
            }

            console.log(data.classType.name);

        }
    });
});



$('.input-daterange input').each(function() {
    $(this).datepicker('clearDates');
});

$('#bookingDate').daterangepicker({
    "maxSpan": {
        "days": 14
    },
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " / ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        "monthNames": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        "firstDay": 1
    },
    "startDate": new Date(),
    "minDate": new Date(),
    "opens": "center",
    "drops": "up",
    "cancelClass": "btn-danger"
});