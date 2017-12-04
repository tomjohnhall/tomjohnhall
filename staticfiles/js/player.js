
var id;
var activeSong;
var paused = true;

function stopAudio() {
  $.each($('audio'), function () {
    $(this)[0].pause();
});
}


function player(audio, callback) {
    id = '#' + audio.id;
    activeSong = audio;
    activeSong.play();

    activeSong.ontimeupdate = function() {

        var fractionOfSong = (activeSong.currentTime/activeSong.duration);
        // make a percentage
        width = (fractionOfSong * 100) + '%';
        // apply to player width
        $('.player').css('width', width);
        $('#draggySong').css('left', width);
      }
      if (typeof callback === 'function' && callback()) {
      callback(); // callback for player function
      }
  }




$(document).ready(function () {

  $('.pause-image').hide();

  // prevent overlapping audio and show pause-play
    document.addEventListener('play', function(e){

      var audios = document.getElementsByTagName('audio');
      for(var i = 0, len = audios.length; i < len;i++){
          if(audios[i] != e.target){
              audios[i].pause();
            }
          }
        paused = false;
        $('.play-image').fadeOut('fast', function() {
        $('.pause-image').fadeIn('fast');
        });
      }, true);


$('.pause-button').click( function() {
    if (paused) {
      activeSong.play();
    }
    else {
      activeSong.pause();
      paused = true;
      $('.pause-image').fadeOut('fast', function() {
        $('.play-image').fadeIn('fast');
      });
    }
  });



});
