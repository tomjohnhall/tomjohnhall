$(document).ajaxStart(function () {
    $('#load-scifi').hide()
    $('#loading').fadeIn();
  }).ajaxStop(function () {
    $('#loading').hide();
  });

function scifi(callback) {
  $.ajax({
    url : "scifi/", // links to a django view for dumping data
    type : "POST",
    data : '', // taken from view via template {{id}}
    dataType : 'json',

    // links are passed in via json
    success : function(story) {
      $('#story').html(story);
      $('#load-scifi').hide();
      $('#song-load').hide();
      $('#thestory').slideDown("slow", function() {
        $('#splash').hide();
      });
      if (typeof callback === 'function' && callback()) {
      callback();
      }
      $('.player-wrap').fadeIn()
    }
  })
}

function loader() {
  $('#thestory').fadeOut();
  $('#splash').fadeOut()
  $('#song-load').fadeIn();
  nasapics = ['url("http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/28725/large_web.jpg")', 'url("http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/29146/large_web.jpg")', 'url("http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/28155/large_web.jpg")'];
  randnasa = nasapics[Math.floor(Math.random()*nasapics.length)];
  $('body').css('background-image', randnasa);
}

var scroll= true

function scrollToggle() {
  scroll = !scroll;
  if (scroll) {
    $('#story-wrap').addClass('scroll-wrap');
    $('#story').addClass('scroll');
  }
  else {
    $('#story-wrap').removeClass('scroll-wrap');
    $('#story').removeClass('scroll');
  }
}



$(document).ready(function() {
  $('#thestory').hide();
  $('#loading').hide();
  $('#songs-nav li').click(function() {
    $('li').removeClass('active');
    $(this).addClass('active');
  });
  var scrollpause = false;
  $('.pause-button').click( function() {
    scrollpause = !scrollpause;
    if (scrollpause) {
        $('#story').css("animation-play-state", "paused");
    }
    else {
        $('#story').css("animation-play-state", "running");
    }

  });

});
