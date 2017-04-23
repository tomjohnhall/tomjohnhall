var isMobile = window.matchMedia("only screen and (max-width: 760px)");

$(document).ajaxStart(function () {
    // hide the loader button
    $('#load-scifi').hide()
    // show the loading wheel
    $('#loading').fadeIn();
  }).ajaxStop(function () {
    // hide the wheel
    $('#loading').hide();
  });

function scifi(callback) {
  $.ajax({
    url : "scifi/", // links to a django view for dumping data
    type : "POST",
    data : '',
    dataType : 'json',

    // links are passed in via json
    success : function(story) {
      $('#story').html(story); // put the story in the div
      $('#load-scifi').hide(); // hide the loader
      $('#song-load').hide(); // hide the song-loader (for the header links)
      if (typeof callback === 'function' && callback()) {
      callback(); // callback for player function
      }
      // if it's mobile, show the intermediary play button (autoplay blocked on mobile browsers)
      if (isMobile.matches) {
        $('.mobile-play').slideDown("slow", function() {
          $('#splash').hide();
        });
      }
      // otherwise hide the splash and show the story and player
      else {
        $('#thestory').slideDown("slow", function() {
          $('#splash').hide(); $('.whole-player').fadeIn();
        });
      }

    }
  })

}

function loader() {
  $('#thestory').fadeOut();
  $('#splash').fadeOut()
  $('#song-load').fadeIn();
  nasapics = ['url("http://saxonhouse.co/filedump/space1.jpg")', 'url("http://saxonhouse.co/filedump/space2.jpg")', 'url("http://saxonhouse.co/filedump/space3.jpg")'];
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

function songEnd(activeSong) {
activeSong.addEventListener('ended', function() {
  if (activeSong.id == "funke") {
    player(document.getElementById('bucco'), songEnd(document.getElementById('bucco')));
    $('li').removeClass('active');
    $('#bucco-nav').addClass('active');

    if (isMobile.matches) {
    $('.pause-image').fadeOut('fast', function() {$('.play-image').fadeIn('fast');})
    }
  }
  else if (activeSong.id == "bucco") {
    player(document.getElementById('plums'), songEnd(document.getElementById('plums')));
    $('li').removeClass('active');
    $('#plums-nav').addClass('active');
    if (isMobile.matches) {
    $('.pause-image').fadeOut('fast', function() {$('.play-image').fadeIn('fast');})
    }
  }
})
}



$(document).ready(function() {
  $('.mobile-play').hide();
  $('#thestory').hide();
  $('#loading').hide();

  $('.mobile-play').click( function() {
    $('#thestory').slideDown("slow", function() {
      $('.mobile-play').hide(); $('.whole-player').fadeIn();
    });

  })



  $('#songs-nav li').click(function() {
    $('li').removeClass('active');
    $(this).addClass('active');
  });




  $('.pause-button').click( function() {
    scrollpause = paused;
    if (scrollpause) {
        $('#story').css("animation-play-state", "paused");
    }
    else {
        $('#story').css("animation-play-state", "running");
    }
  });

  (function blink() {
  $('.blink-me').fadeOut(500).fadeIn(500, blink);
  })();

});
