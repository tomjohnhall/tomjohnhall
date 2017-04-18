
var id;
var activeSong;

function player(audio) {
    $('audio').trigger('pause');
    id = '#' + audio.id;
    activeSong = audio;
    $(id).trigger('play');
    activeSong.ontimeupdate = function() {

        var fractionOfSong = (activeSong.currentTime/activeSong.duration);
        // make a percentage
        width = (fractionOfSong * 100) + '%';
        // apply to player width
        $('.player').css('width', width);
      }
  }





$(document).ready(function () {

var paused = false;

$('.pause-button').click( function() {
    paused = !paused;
    if (paused) {
      $(id).trigger('pause');
      $('.pause-image').fadeOut('fast', function() {
        $('.play-image').fadeIn('fast');
      });
    }
    else {
      $(id).trigger('play');
      $('.play-image').fadeOut('fast', function() {
        $('.pause-image').fadeIn('fast');
    });
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
        var playerWidth = $('.player-wrap').width();
        var divide = (playerWidth / draggedTo);
        var songTime = (activeSong.duration / divide);
        songTime = parseInt(songTime);
        activeSong.currentTime = songTime;
      }
    });


});
