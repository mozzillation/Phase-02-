$(document).ready(function () {

    $.get("./assets/js/viz/data/speaker.svg", function (data) {
        var svg = new XMLSerializer().serializeToString(data.documentElement);
        $('#speaker-viz').append(svg);
    });

})
