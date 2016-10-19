$('pre').click(function (event) {
    zoom.to({
        element: this
    });
    event.preventDefault();
});
$('.zoomable').click(function (event) {
    zoom.to({
        element: this
    });
    event.preventDefault();
});
$.each($('code[data-trim=""]'),function(k,v){
    $(v).html($.trim($(v).html()));
});