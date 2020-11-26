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
    'r1',
    'r2'
]
var suites = [
    's1',
    's2'
]
$(document).ready(function() {
    $('select').selectpicker()
    $('#type').change(function(e) {
        let type = $('#type').val()
        if (type == 'room') {
            let classType = ""
            rooms.forEach(room => classType += `<option value="${room}">${room}</option>`)
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')
        } else {
            let classType = ""
            suites.forEach(suite => classType += `<option value="${suite}">${suite}</option>`)
            $('.bootstrap-select select#classType').empty().selectpicker('refresh')
            $('.bootstrap-select select#classType').append(classType).selectpicker('refresh')
        }
    });
});