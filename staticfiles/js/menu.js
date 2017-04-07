
$(document).ready(function(){
$('.menu-button').click( function() {
    console.log('menu');
    document.getElementById("site-menu").style.width = "100%";
    document.getElementById("site-menu").style.height = "100%";
});

$('.menu-close').click( function() {
    document.getElementById("site-menu").style.height = "0%";
    document.getElementById("site-menu").style.width = "0%";
});
});
