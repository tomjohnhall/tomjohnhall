
var id;
var activeSong;
var paused = true;

function player(audio) {
    id = '#' + audio.id;
    activeSong = audio;

    if (!activeSong.paused || activeSong.currentTime > 0) {
      paused = false;
      $('.play-image').fadeOut('fast', function() {
      $('.pause-image').fadeIn('fast'); });
    }
    activeSong.ontimeupdate = function() {

        var fractionOfSong = (activeSong.currentTime/activeSong.duration);
        // make a percentage
        width = (fractionOfSong * 100) + '%';
        // apply to player width
        $('.player').css('width', width);
        $('#draggySong').css('left', width);
      }


  }





$(document).ready(function () {

$('.play-image').hide();

$('.play-button').click(function() {
  activeSong.play();
})

$('.pause-button').click( function() {
    if (paused) {
      activeSong.play();
      $('.play-image').fadeOut('fast', function() {
        $('.pause-image').fadeIn('fast');
      });
      paused = !paused;
    }
    else {
      activeSong.pause();
      $('.pause-image').fadeOut('fast', function() {
        $('.play-image').fadeIn('fast');

    });
    paused = !paused;
    }
  });


// DRAGGY SONG - drag small slider in player to change song position.
// Note - does not work on locally hosted files for testing.

$( "#draggySong" ).draggable({ axis: "x" }, {
      start: function() {
      },
      drag: function() {
      },
      stop: function() {
        var offset = $('#draggySong').position();
        var draggedTo = offset.left;
        console.log(draggedTo);
        var playerWidth = $('.player-wrap').width();
        console.log(playerWidth);
        var divide = (playerWidth / draggedTo);
        console.log(divide);
        var songTime = (activeSong.duration / divide);
        songTime = parseFloat(songTime);
        activeSong.currentTime = songTime;
      }
    });


});
