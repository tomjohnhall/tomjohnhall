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
  if (typeof callback === 'function' && callback()) {
  callback(); // callback for player function
  }
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
      // hide the splash and show the story and player
      $('#thestory').slideDown("slow", function() {
        $('#splash').hide(); $('.whole-player').fadeIn();
      });

    }
  })
}

function loader() {
  $('#thestory').fadeOut();
  $('#splash').fadeOut();
  $('#song-load').fadeIn();
  nasapics = ['url("http://saxonhouse.co/filedump/space1.jpg")', 'url("http://saxonhouse.co/filedump/space2.jpg")', 'url("http://saxonhouse.co/filedump/space3.jpg")'];
  randnasa = nasapics[Math.floor(Math.random()*nasapics.length)];
  $('body').css('background-image', randnasa);
}

var scroll = true

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

function songEnd(song) {
song.addEventListener('ended', function() {
  if (song.id == "funke") {
    if (isMobile.matches) {
    song.pause();
    $('.pause-image').fadeOut('fast', function() {
      $('.play-image').fadeIn('fast');
    });
  }
    player(document.getElementById('bucco'), songEnd(document.getElementById('bucco')));
    $('li').removeClass('active');
    $('#bucco-nav').addClass('active');
  }
  else if (song.id == "bucco") {
    if (isMobile.matches) {
    song.pause();
    $('.pause-image').fadeOut('fast', function() {
      $('.play-image').fadeIn('fast');
    });
    }
    player(document.getElementById('plums'), songEnd(document.getElementById('plums')));
    $('li').removeClass('active');
    $('#plums-nav').addClass('active');
  }
})
}


function splashload(funke) {
  if (isMobile.matches) {
    funke.play();
  }
  $('.whole-player').fadeIn();
  scifi(function() {player(funke, songEnd(funke))});
}

function loadsong(song) {
  if (isMobile.matches) {
    stopAudio();
    song.play();
    $('.whole-player').fadeIn();
  }
  loader();
  scifi(function() {player(song, songEnd(song))});
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
    scrollpause = !scrollpause
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
