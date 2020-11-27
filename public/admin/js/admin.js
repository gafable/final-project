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
var rooms = [
    'Single',
    'Double',
    'Triple',
    'Quad',
    'Twin',
    'King',
    'Double-double',
    'Studio',
    'Connecting',
    'Murphy',
    'Cabana'
]
var suites = [
    'Royal',
    'Overwater Bungalow',
    'Presidential',
    'Villa',
    'Penthouse',
    'Terrace',
    'Junior',
    'Deluxe',
    'Executive'
]

$(document).ready(function() {
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
                (classTypeValue && room == classTypeValue) ? classType += `<option value="${room}" selected>${room}</option>`: classType += `<option value="${room}">${room}</option>`
            })
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')


        } else {
            let classType = ""
            suites.forEach((suite) => {
                (classTypeValue && suite == classTypeValue) ? classType += `<option value="${suite}" selected>${suite}</option>`: classType += `<option value="${suite}">${suite}</option>`
            })
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')

        }
    }

    updateClassTypeItem()
    $('.bootstrap-select .classType').selectpicker('val', 'asd');

});