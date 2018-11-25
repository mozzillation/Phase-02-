$(document).ready(function () {

    if ($('#meme').length) {



        $.get("./assets/js/viz/data/meme/meme.svg", function (data) {
            var svg = new XMLSerializer().serializeToString(data.documentElement);
            $('#meme-viz').append(svg);
            callback();
        });

    }




    function callback() {


        $('#meme').click(function (e) {
            $this = $(this).children('#meme-viz');

            if ($this.hasClass('zoom-out')) {
                $this.removeClass('zoom-out');

                $this.css({
                    'transform': 'scale(1)'
                });

            } else {
                $this.addClass('zoom-out');
                $this.css({
                    'transform': 'scale(5)',
                    'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
                });

                $('#meme')
                    .on('mousemove', function (e) {
                        $(this).children('#meme-viz.zoom-out').css({
                            'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
                        });
                    })
            }



        })


        // tiles set u



    }

});
