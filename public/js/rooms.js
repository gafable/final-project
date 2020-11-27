    $('.modalView').click(function() {
        $('#modalQuickView').modal('show');
    })

    $('.hotel-content').click(function() {
        $id = $(this).find('.room-id').val()
        $.get("/rooms/show/" + $id, function(data, textStatus, jqXHR) {
            if (textStatus == "success") {
                $modal = $('#akoa');
                $modal.find('.title').text(data.room.classType);
                $modal.find('.image').css('background-image', `url(${data.room.imageUrl})`);
                $modal.find('.subtitle').text(data.room.classType);
                $modal.find('#descriptionData').html(data.room.description)
                $modal.modal('show');
                console.log(data.room);
            }
        });

    })