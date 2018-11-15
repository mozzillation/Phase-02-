//// QUESTION 01 
//
//$('#seealsology').find('.category_nodes').on('mousemove', function (evt) {
//    var x = evt.pageX - $(this).offset().left + 10;
//    var y = evt.pageY - $(this).offset().top + -20;
//
//    $('.category_nodes__popup').css({
//        top: y,
//        left: x
//    });
//
//    var parent = $(this).parent();
//
//
//    parent.find('circle').hover(function () {
//            var $this = $(this);
//            var pageName = $this.data('name');
//            parent.find('.category_nodes__popup').addClass('is-visible').html(pageName);
//            parent.find('circle').not($this).addClass('hide');
//        },
//        function () {
//            $('.category_nodes__popup').removeClass('is-visible')
//            $('circle').removeClass('hide');
//        });
//
//
//    $('circle').click(function () {
//        var pageName = $(this).data('name');
//        pageName = pageName.replace(/ /g, '_');
//        console.log(pageName);
//        window.open('https://en.wikipedia.org/wiki/' + pageName);
//
//    })
//
//});
//
//
//
//$('circle').each(function (i) {
//    var row = $(this);
//    setTimeout(function () {
//        row.toggleClass('is-visible', !row.hasClass('is-visible'));
//    }, 10 * i);
//});