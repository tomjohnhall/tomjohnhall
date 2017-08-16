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

// TRANSACTION MAP - using google maps API, a map displays location of transactions, leaving behind a marker with each
// new transaction. A line is drawn to create a map of my guilty movements.
// the following lines of code will ANNOY: I hadn't seen google's standard of abbreviation as lat-lng, and decided
// of my own volition to go with lat-lon, which I think is better. So, YEP.

function initMap(lat,lon) {
  // make a maps coordinate object out of lat and lon
  var newpoint = new google.maps.LatLng(lat, lon);

  // make a map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: newpoint,
    disableDefaultUI: true,
    styles: [],
      });

  // make a marker
  var marker = new google.maps.Marker({
      position: newpoint,
      });

  var poundSVG = 'm 301.29681,788.55573 0,32.9956 -81.5918,0 c 5.99351,17.19988 8.99033,31.20133 8.99048,42.0044 l 0,0.60424 c -1.5e-4,21.9972 -11.59682,46.79576 -34.79004,74.39576 -9.20421,11.20611 -21.20371,24.20659 -35.99854,39.00146 23.5961,-15.60053 47.99182,-23.40082 73.18726,-23.40088 14.0013,6e-5 30.40143,3.00299 49.20044,9.00879 21.99685,6.39653 37.79883,9.59477 47.406,9.59473 16.00316,4e-5 32.60471,-5.99971 49.80469,-17.99927 l 25.19531,39.60571 c -22.80303,22.39993 -49.00539,33.59983 -78.60717,33.59983 -17.60277,0 -42.99947,-5.603 -76.19019,-16.8091 l -11.40747,-4.1931 c -13.19594,-4.4067 -26.39783,-6.6101 -39.60571,-6.6101 -21.1915,0 -42.98713,7.4036 -65.38696,22.2107 l -28.8025,-39.6057 c 40.79584,-35.20501 64.79484,-65.40518 71.99708,-90.60058 2.00185,-7.20202 3.00283,-14.80089 3.00292,-22.79664 -9e-5,1.5e-4 -9e-5,-0.20127 0,-0.60424 l 0,-0.60425 c -9e-5,-15.19759 -4.80355,-30.79816 -14.4104,-46.80176 l -65.991206,0 0,-32.9956 48.596196,0 c -18.39605,-30.39526 -28.59501,-52.19089 -30.59693,-65.38697 -0.8057,-3.60078 -1.20853,-7.60468 -1.20849,-12.01172 l 0,-6.00586 c -4e-5,-39.59926 16.00336,-71.99669 48.01025,-97.19238 26.4037,-20.80035 57.80015,-31.20073 94.18945,-31.20117 l 0.60425,0 c 45.20242,4.4e-4 80.20604,14.80145 105.01099,44.40308 l 10.19897,14.99633 c 10.79072,18.39636 16.38763,44.99545 16.79077,79.79737 l -52.7893,0 c -1.59938,-61.59632 -28.80272,-92.39463 -81.61011,-92.39502 -35.59584,3.9e-4 -60.59582,12.59803 -75,37.79297 -6.39658,11.20639 -9.59482,24.01156 -9.59473,38.41552 l 0,0.58594 c -9e-5,15.21026 4.40054,31.21366 13.20191,48.01025 l 0,0.60425 0.60424,0.58594 c 1.59902,3.60134 3.79629,8.00197 6.5918,13.2019 l 5.40161,9.00879 9.59473,16.79078 z';
  var poundLink = 'https://img.clipartfest.com/44d44c11fbcbf586fa07ead2d390d80b_pound-coin-icon-clip-art-pound-symbol-clipart_300-300.png';

  var lineSymbol = {
          path: poundSVG,
          strokeOpacity: 1,
          fillColor: '#000000',
          fillOpacity: 1,
          rotation: 0,
          scale: 0.03
        };

  // make a polyline - this is the line that will connect each new point.
  poly = new google.maps.Polyline({
    path: [newpoint], // path only has one point so far
    strokeOpacity: 0,
    strokeColor: '#000000',
          icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],

  });

  // set poly + marker to map (duh)

  poly.setMap(map);
  marker.setMap(map);
  animateCircle(poly);

}

function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 50);
}

// function to run when a new transaction is loaded with ajax
function addLatLng(lat,lon) {
  // get the path from poly (a list of marker locations)
  var path = poly.getPath();
  // make a point of it
  var newpoint = new google.maps.LatLng(lat, lon);
  path.push(newpoint);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: newpoint,
    title: '#' + path.getLength(),
    map: map
    });

  // set poly to map and pan to latest marker
  poly.setMap(map);
  map.panTo(newpoint);
  }

function showMap() {
  $('#map-container').animate({height: '300px'}, 400, function() {
    google.maps.event.trigger(map, 'resize');
    });
  }

function hideMap() {
  $('#map-container').animate({height: '0'}, 400);
  }

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
          addLatLng(data_set.lat, data_set.lon);
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


function randomColour() {
  /* Random background color */
  var background = '#000000';
  var randomEight = getRandomInt(0,8);
  var randomEightTwo = getRandomInt(0,8);
  if(randomEightTwo == randomEight) {
    while(randomEightTwo == randomEight) {
      var randomEightTwo = getRandomInt(0,8);
    }
  }
  var colors = ['rgba(222, 176, 213, 0.47)', 'rgba(186, 206, 241, 0.31)', 'rgba(160, 209, 169, 0.43)', 'rgba(#afb8d1, 0.3)', 'rgba(#c2aecf, 0.31)', 'rgba(#e9a9dd, 0.31)', 'rgba(#ecb7b7, 0.35)', 'rgba(#f4eea9, 0.34)' ] ;
  background = colors[randomEight] ;
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
    else {
      $('#transaction-feed').click( function() {
          swap();
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
