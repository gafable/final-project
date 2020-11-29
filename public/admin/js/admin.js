$('#addFeatureBtn').click(function() {

    $('#featuresInput').removeClass('d-none');
})

$('#addFeature').click(function() {
    let feature = $('#feature').val();
    $('#featureList').append(`
    <li class="list-group-item">
        ${feature}
    </li>
    `)
    $('#feature').val('');
})

$('#customFile').change(function(event) {
    $('.custom-file-label').text(event.target.files[0].name)
});

$('.update-room').click(function(e) {

    e.stopPropagation();

});


$(document).ready(function() {
    var rooms = []
    var suites = []
    $.get("/classtypes/all", function(data, status) {
        if (status == "success") {
            console.log(data.classTypes);
            data.classTypes.forEach((classType) => {
                console.log(classType);
                classType.type == "room" ?
                    rooms.push(classType) :
                    suites.push(classType)
            })
            updateClassTypeItem()
        } else {
            alert('Server Error : Please refresh the page.')
        }
    });
    $('select').selectpicker()
    $('#type').change(function(e) {
        updateClassTypeItem()
    });

    function updateClassTypeItem() {
        let type = $('#type').val()
        let classTypeValue = $('#classType').data('value')
        if (type == 'room') {
            let classType = ""
            rooms.forEach((room) => {
                classTypeValue && room._id == classTypeValue ?
                    classType += `<option value="${room._id}" selected>${room.name}</option>` :
                    classType += `<option value="${room._id}">${room.name}</option>`
            })
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')


        } else {
            let classType = ""
            suites.forEach((suite) => {
                classTypeValue && suite._id == classTypeValue ?
                    classType += `<option value="${suite._id}" selected>${suite.name}</option>` :
                    classType += `<option value="${suite._id}">${suite.name}</option>`
            })
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')

        }
    }
    $('.bootstrap-select .classType').selectpicker('val', 'asd');

});