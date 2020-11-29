    $('.modalView').click(function() {
        $('#modalQuickView').modal('show');
    })

    $('.hotel-content').click(function() {
        $id = $(this).find('.room-id').val()
        $.get("/rooms/show/" + $id, function(data, textStatus, jqXHR) {
            alert(textStatus)
            if (textStatus == "success") {
                $modal = $('#akoa')
                $modal.find('.title').text(data.room.classType)
                $modal.modal('show')
                console.log(data.room.imageUrl);
            }

        });

    })