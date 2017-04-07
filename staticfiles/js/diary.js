$(document).ready(function(){
    revealed = false;

  $(document).scroll(function() {
  if ($(document).scrollTop() >= 500) {
    if (revealed == false) {
    $('#secret').fadeIn().delay(2000).fadeOut();
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
      $('#phone-input').fadeIn().delay(5000).fadeOut();
    }
    revealed = true;
  }
  }
});
});
