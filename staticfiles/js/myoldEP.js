$(document).ajaxStart(function () {
    $('#load-scifi').hide()
    $('#loading').fadeIn();
  }).ajaxStop(function () {
    $('#loading').hide();
  });

function scifi() {
  console.log("sci fi has started");
  $.ajax({
    url : "scifi/", // links to a django view for dumping data
    type : "POST",
    data : '', // taken from view via template {{id}}
    dataType : 'json',

    // links are passed in via json
    success : function(story) {
      $('#story').replaceWith(story);
      $('#load-scifi').hide();
    }
  });
}

$(document).ready(function(){
$('#loading').hide();
$('#load-scifi').click(function() {
  scifi();
});

});
