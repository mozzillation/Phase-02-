$(document).ready(function () {

    $.get("./assets/js/viz/data/speaker/speaker.svg", function (data) {
        var svg = new XMLSerializer().serializeToString(data.documentElement);
        $('#speaker-viz').append(svg);
        callback()
    });


    function callback() {

        $.getJSON("./assets/js/viz/data/speaker/video.json", function (data) {

            var leng = Object.keys(data.video).length;


            $('#speaker-viz svg #video').find('circle').each(function (i, el) {

                console.log(el);

                if (i < leng) {
                    var remap = i;
                    var name = data.video[remap].title;
                    var url = data.video[remap].url;

                    $(this).attr("data-title", name).attr("data-url", url);

                }
            })


        });





        $.getJSON("./assets/js/viz/data/speaker/people.json", function (data) {

            var leng = Object.keys(data.people).length - 1;

            //            console.log(leng);

            $('#speaker-viz svg #views > g').each(function (i, el) {

                if (i < 15) {
                    var remap = i;
                    var name = data.people[remap].name;

                    $(this).attr("data-name", name);

                }
            })

            $('#speaker-viz svg #video > g').each(function (i, el) {

                if (i < 15) {
                    var remap = i;
                    var name = data.people[remap].name;

                    $(this).attr("data-name", name);

                }
            })

            $('#speaker-viz svg #people > g').each(function (i, el) {

                if (i < 15) {
                    var remap = leng - i;
                    var name = data.people[remap].name;

                    $(this).attr("data-name", name);

                }
            })

        })

        $.getJSON("./assets/js/viz/data/speaker/reaction.json", function (data) {

            var leng = Object.keys(data.reaction).length - 1

            $('#speaker-viz svg #people > g').each(function (i, el) {

                if (i < 15) {
                    var remap = leng - i;
                    var like = data.reaction[remap].like;
                    var dislike = data.reaction[remap].dislike;

                    $(this).attr("data-like", like).attr("data-dislike", dislike);

                }



            })

        })

        $('#speaker-viz svg #people > g').hoverIntent(function (evt) {

            $this = $(this);

            var name = $(this).data('name');
            var orientation;

            if (name == "Milo Yiannopoulus") {

                orientation = "antifeminist"

            } else {
                orientation = "pro feminist"
            }

            $('#speaker .orientation').toggleClass('is-visible').removeClass("pro feminist antifeminist").addClass(orientation).html(orientation);


            $('#speaker .reactions').toggleClass('is-visible');

            $('#speaker').on('mousemove', function (evt) {
                var x = evt.pageX - $(this).offset().left + 10;
                var y = evt.pageY - $(this).offset().top + +20;




                $('#speaker .orientation').css({
                    top: y,
                    left: x
                });
            })

            $('#speaker-viz svg #people > g').not($this).toggleClass('is-hidden');
            $('#speaker-viz svg #views > g, #speaker-viz svg #video > g ').not("[data-name='" + name + "']").toggleClass('is-hidden');

            var x, y;


            var like = $(this).data('like');
            var dislike = $(this).data('dislike');
            $('#speaker .reactions').find('.like').html(like);
            $('#speaker .reactions').find('.dislike').html(dislike);

        })



        $('svg #video circle').hoverIntent(function () {
            var $this = $(this);

            var title = $this.data('title');
            var url = $this.data('url');
            $('#speaker .popup').toggleClass('is-visible');
            $('#speaker .popup span').html(title);

            $('#speaker').on('mousemove', function (evt) {
                var x = evt.pageX - $(this).offset().left + 10;
                var y = evt.pageY - $(this).offset().top + +20;

                $('#speaker .popup').css({
                    top: y,
                    left: x
                });
            })


            $(this).click(function () {
                window.open(url, '_blank');
            })

        });








    }





});
