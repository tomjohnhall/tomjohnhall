// GUILTFEED - uses Ajax to pass json objects to and from django - takes transaction id, sends a request for the
// guiltwords associated with that transaction, which itself has a selection of guiltlinks, which are displayed in the
// DOM in a duplicate-safe feed.


// The function needs a transaction id to get started
function guiltfeed(id, div) {
  $.ajax({
    url : "guilt/", // links to a django view for dumping data
    type : "POST",
    data : { id }, // taken from view via template {{id}}
    dataType : 'json',

    // links are passed in via json
    success : function(links) {
      // initialize the bits for each feed section
      var hyperlink = '';
      var title = '';
      var description = '';
      var image_url = '';
      var prepender = '';
      // loop through guilt links
      for (i = 0; i < 3; i++) {
          var link = links[i];
          // check if link has already been added to feed
            // everything gets compiled into html elements
            image = '<div class="guilt-img-container"><img class="guilt-img" src="' + link.image_url + '"></div>' ;
            hyperlink = '<a href="' + link.link + '" target ="_blank">' ;
            title = '<h2 class="guilt-title">' + link.title + '</h2></a>' ;
            description = '<p class="guilt-description">' + link.description + '</p>' ;
            // Now we have a full block of html to add to the feed as an article element
            prepender = '<div class="guilt-item col-xs-12 col-sm-4">' + image + hyperlink + title + description + '</div>' ;
            var $prepender = $(prepender);
            $('#loading').fadeOut();
            // add to top of feed
            $prepender.hide().appendTo(div).slideDown(600);
        }
    }
});
};



// SWAP - The main event. Swap incorporates all of the above to essentially replace the bulk of data in the DOM without
// refreshing. The transaction is swapped out, guiltfeed updated and map given a new marker.

// Fisher Yates shuffle for mixing up page

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function swap() {
  $.ajax({
      url : "change/", // a django view which grabs a random transaction and dumps as Json
      type : "POST",
      data : { }, // we don't need to specify, the whole django jsonreponse
      dataType : 'json',

      // the data set is basically a js replica of a Transaction python object
      success : function(data_set) {
          operator = getRandomInt(120453, 999999);
          // so go ahead and replace the stuff
          image = '<img class="transaction-image" src="' + data_set.bing_image + '" />'
          head = '<p class="transaction-shop">' + data_set.shop  + '</p> <p class="transaction-address">' + data_set.address + '</p>' + '<div class="transaction-dashed"> <p class="transaction-operator"> OPERATOR: ' + operator + '</p> <p class="transaction-id"> #tr00' + data_set.tran_id + '</p> </div>  <p class="transaction-date">' + data_set.strdate + '</p>';
          body = '<div class="transaction-list"> <p class="transaction-item">' + data_set.item + '</p> <p class="transaction-price"> £ ' + data_set.price + '</p> <p class="transaction-total"> TOTAL: £' + data_set.price + '</p>' + image + '</div> <p class="transaction-card"> PAYMENT: VISA ************' + getRandomInt(1111,9999) + '<p class="transaction-notes"> - Thank you for your custom - <br> - ' + data_set.notes + ' - </p>';
          // check for image because otherwise we'll end up with broken image elements on the page

          background = randomColour();

          transaction = '<div class="transaction" style="background-color: ' + background + '"><div class="transaction-receipt">' + head +  body + '</div><div style="clear: both"></div></div>';
          $transaction = $(transaction);
          $transaction.hide().prependTo('#transaction-feed').slideDown(600);
          // pass the id to guiltfeed
          tran_id = data_set.tran_id;
          $guilt = $('<div>', {'class': 'row'});
          $guilt.appendTo($transaction);
          guiltfeed(tran_id, $guilt);
      }
});
};



// SPLASH - the splash page also acts as a play-pause interface

// Open when someone clicks on the span element
function openSplash() {
    document.getElementById("splash").style.width = "100%";
}

// Close when someone clicks on the Play button
function closeSplash() {
    document.getElementById("splash").style.width = "0%";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// mixPage function - various visual trickery

var background = '#ffffff';

function randomColour() {
  /* Random background color */
  var randomFour = getRandomInt(0,4);
  var colors = ['rgba(222, 176, 183, 0.45)', 'rgba(186, 206, 241, 0.29)', 'rgba(160, 209, 169, 0.31)', 'rgba(244, 238, 169, 0.31)' ] ;
  var newbackground = colors[randomFour] ;
  if(newbackground == background) {
    while(newbackground == background) {
      randomFour = getRandomInt(0,4);
      newbackground = colors[randomFour] ;
    }
  }
  background = newbackground
  return background
}

/*
 function checkAudio() {
  if(!!document.createElement('audio').canPlayType) {
}
  else {
    $('.player').html('Audio not supported');
  }
};
*/

// AUTOOSWAP - Call swap on an interval loop via toggle switch.

var autoState = false;
var interval = null;

function autoSwap() {
  autoState = !autoState;
  if (autoState) {
    interval = setInterval(swap, 3000);
    $('#auto').fadeTo(400, 1);
  }
  else {
    $('#auto').fadeTo(400, 0.5);
    clearInterval(interval);
  }
}

// ajax loading

$(document).ajaxStart(function () {
    $('#loading').fadeIn();
  }).ajaxStop(function () {
    $('#loading').fadeOut();
    // fade out inside guilt function for better ordering
  });

// ON LOAD

$(document).ready(function(){
  $('#loading').hide();
  $('#cart-btn').on('click touchstart', function() {
      swap();
  });
  $('.transaction-item').mouseenter(function () {
    console.log('mouse enter');
    $(this).siblings('.transaction-image').fadeIn();
  });
  $('.transaction-item').mouseleave(function() {
    $(this).siblings('.transaction-image').fadeOut();
  });
});

$(document).on('mouseenter', ".transaction-item", function() {
     $(this).siblings('.transaction-image').fadeIn("fast");
}).on('mouseleave', ".transaction-item", function() {
     $(this).siblings('.transaction-image').fadeOut("fast");
});

// HANDLE EVENTS

// TEST FOR MOBILE

function isMobile() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {

    $('#credits-hover').hide()
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
         $('#credits').fadeIn();
      }
      else {
        $('#credits').fadeOut();
      }
    });
  }

 };

// set swap to run every time the transaction (not map or guiltfeed) is clicked

// CREDITS

$('#credits-hover').mouseenter( function() {
  $(this).fadeOut(400, function() {
    $('#credits').fadeIn();
  });
});
$('#credits').mouseleave( function() {
  $(this).fadeOut(400, function() {
    $('#credits-hover').fadeIn();
  });
});
