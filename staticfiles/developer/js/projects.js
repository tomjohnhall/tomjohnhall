$(document).ready(function() {
  $('.previous-project').click(function() {
    target = $(this).parents('.project').prev('.project');
    $('html, body').animate({
      scrollTop: (target.offset().top - 54)
    }, 1000);
  });
  $('.next-project').click(function() {
    target = $(this).parents('.project').next('.project');
    $('html, body').animate({
      scrollTop: (target.offset().top - 54)
    }, 1000);
  });
});
