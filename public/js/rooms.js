

$('.hotel-content').click(function () {
    $id = $(this).find('.room-id').val()
    $.get("/rooms/show/" + $id, function (data, textStatus, jqXHR) {
        if (textStatus == "success") {
            $modal = $('#akoa');
            $modal.find('.title').text(data.room.classType.name);
            $modal.find('.image').css('background-image', `url(public/images/blog.jpg)`);
            $modal.find('.subtitle').text(data.room.classType.name);
            $modal.find('#descriptionData').html(data.room.classType.description)
            let features = ""
            data.room.classType.features.forEach(feature => features += `<ul>${feature} </ul>`)
            $modal.find('#features').html(features)
            $modal.modal('show');
            console.log(data.room);
        }
    });
})



$('.input-daterange input').each(function () {
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
}, function (start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});
