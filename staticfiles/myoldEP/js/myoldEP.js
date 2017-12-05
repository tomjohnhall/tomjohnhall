var isMobile = window.matchMedia("only screen and (max-width: 760px)");

$(document).ajaxStart(function () {
    // hide the loader button
    $('#load-scifi').hide()
    // show the loading wheel
  }).ajaxStop(function () {
    // hide the wheel
    $('#loading').hide();
  });

function scifi(callback) {
  $('#loading').fadeIn();
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
      console.log(story);
      $('#story-title').html(story.title);
      $('#author').html(story.author);
      $('#story-link').attr('href', story.url);
      $('#story-body').html('');
      for (var i=0; i < story.body.length; i++) {
        var p = '<p class="storypara">' + story.body[i] + '</p>';
        $('#story-body').append(p);
      }
      // put the story in the div
      $('#load-scifi').hide(); // hide the loader
      $('#song-load').hide(); // hide the song-loader (for the header links)
      // hide the splash and show the story and player
      $('#thestory').slideDown("slow", function() {
        $('#splash').hide();
        $('.whole-player').fadeIn();
        $('#original-link').fadeIn();
      });

    }
  })
}

function loader(nasapics) {
  $('#thestory').fadeOut();
  $('#splash').fadeOut();
  $('#song-load').fadeIn();
  randnasa = nasapics[Math.floor(Math.random()*nasapics.length)];
  $('body').css('background-image', 'url('+randnasa+')')
  ;
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

function loadsong(song, nasapics) {
  if (isMobile.matches) {
    stopAudio();
    song.play();
    $('.whole-player').fadeIn();
  }
  loader(nasapics);
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
