$('select').selectpicker();

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