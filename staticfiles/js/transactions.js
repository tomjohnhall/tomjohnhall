// GUILTFEED - uses Ajax to pass json objects to and from django - takes transaction id, sends a request for the
// guiltwords associated with that transaction, which itself has a selection of guiltlinks, which are displayed in the
// DOM in a duplicate-safe feed.

// A list for links added to feed to catch duplicates
var addedLinks = [];

// The function needs a transaction id to get started
function guiltfeed(id) {
  console.log("guiltfeed has started") // check guiltfeed has been called
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
      for (i = 0; i < links.length; i++) {
          var link = links[i];
          // check if link has already been added to feed
          if (addedLinks.indexOf(link.link) == -1) {
            // good news everyone!
            console.log("link is new");
            // everything gets compiled into html elements
            image = '<div class="guilt-img-container"><img class="guilt-img" src="' + link.image_url + '"></div>' ;
            hyperlink = '<a href="' + link.link + '" target ="_blank">' ;
            title = '<h2 class="guilt-title">' + link.title + '</h2></a>' ;
            description = '<p class="guilt-description">' + link.description + '</p>' ;
            // Now we have a full block of html to add to the feed as an article element
            prepender = '<div class="guilt-item">' + image + hyperlink + title + description + '</div>' ;
            var $prepender = $(prepender)
            $('#loading').fadeOut();
            // add to top of feed
            $prepender.hide().prependTo('#guiltfeed').slideDown(600);

            // add link to addedLinks to prevent duplicates
            // ** note to self:wouldn't it be restrictive if things NEVER repeat? **
            addedLinks.push(link.link);
            }
          // caught repeats
          else {
            console.log("link is old")
          }
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
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
],
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
          var grid = ['#top-left', '#top-mid', '#top-right', '#bottom-right'];
          grid = shuffle(grid);
          // so go ahead and replace the stuff
          var title = '<h1 class="transaction-title"> Transaction #' + data_set.tran_id + '</h1> <p class="item">' + data_set.item + '</p> <p class="shop">' + data_set.shop + '</p>' ;
          var price = '<h1 class="price"> £ ' + data_set.price + '</h1> <p class="date">' + data_set.strdate + '</p>';
          var notes = '<p class="notes">' + data_set.notes + '</p>';
          $('.transaction').fadeTo(200, 0, function() {
          $(grid[0]).children('.nano-content').html(title);
          $(grid[1]).children('.nano-content').html(price);
          // check for image because otherwise we'll end up with broken image elements on the page
          if (data_set.image_url != null) {
            var image_html = '<img class="transaction_image" src="' + data_set.image_url + '">';
            $(grid[2]).children('.nano-content').html(image_html);
           }
          else if (data_set.bing_image != null) {
            var image_html = '<img class="transaction_image" src="' + data_set.bing_image + '">';
            $(grid[2]).children('.nano-content').html(image_html);
           }
          else {
          // if no image, just get rid of the thing altogether
            $(grid[2]).children('.nano-content').html('');
            }
          $(grid[3]).children('.nano-content').html(notes);
          mixPage();
          });
          $('.transaction').fadeTo(400, 1);
          addLatLng(data_set.lat, data_set.lon);
          // pass the id to guiltfeed
          tran_id = data_set.tran_id;
          guiltfeed(tran_id);
          console.log("success"); // all done
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
    if(!paused) {
    $('#song').trigger('play');
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// mixPage function - various visual trickery


function mixPage() {
  /* Random background color */
  var background = '#000000';
  var randomEight = getRandomInt(0,8);
  var randomEightTwo = getRandomInt(0,8);
  if(randomEightTwo == randomEight) {
    while(randomEightTwo == randomEight) {
      var randomEightTwo = getRandomInt(0,8);
    }
  }
  var colors = ['#deb0d5', '#bacef1', '#a0d1a9', '#afb8d1', '#c2aecf', '#e9a9dd', '#ecb7b7', '#f4eea9' ] ;
  background = colors[randomEight] ;
  $('body').css('background', background);
  /* Random Fonts */
  var fonts = [];

}

function checkAudio() {
  if(!!document.createElement('audio').canPlayType) {
}
  else {
    $('.player').html('Audio not supported');
  }
};

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
  $('.nano').nanoScroller();
});

// HANDLE EVENTS

// TEST FOR MOBILE

function isMobile() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {
      var pageElement = document.getElementById('thing-wrapper')

      // create a simple instance
      // by default, it only adds horizontal recognizers
      var pageHammer = new Hammer(pageElement);

      // listen to events...
      pageHammer.on("panleft panright", function(ev) {
        swap();
      });

      /*
      var tapped = false;

      $('.grid-box').each(function( index ) {
        /
        $(this).hammer().bind("tap", function() {
          tapped = !tapped;
          console.log(tapped);
          if (tapped) {
            $(this).animate({height: '200%'}, 500);
          }
          else {
            $('.grid-box').animate({height: '100%'}, 500);
          }
        });
      });
    */
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
      $('.transaction').click( function() {
          console.log("page clicked")  // sanity check
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


// PLAYER - An audio element with play button in splash page and pause in header.
// Update player width (a mask over the header) to reflect song position.

$('.play-button').click( function() {
    $('#song').trigger('play');
});

var paused = false;
var playButton = '<img id="pause-play" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6IzU1NjA4MDsiIGQ9Ik0xOTYuMjY3LDM3NS40NjdINDcuNzg3QzI0Ljc0NywzNzUuNDY3LDAsMzU5LjI1MywwLDMzMi44VjQ2LjkzM0MwLDIyLjE4NywyMy4wNCwwLDQ3Ljc4NywwaDQxNy4yOCAgQzQ4OS44MTMsMCw1MTIsMjIuMTg3LDUxMiw0Ni45MzN2MjQzLjJjMCw1LjEyLTMuNDEzLDguNTMzLTguNTMzLDguNTMzYy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzN2LTI0My4yICBjMC0xNS4zNi0xNC41MDctMjkuODY3LTI5Ljg2Ny0yOS44NjdINDcuNzg3Yy0xNS4zNiwwLTMwLjcyLDE0LjUwNy0zMC43MiwyOS44NjdWMzMyLjhjMCwxNS4zNiwxNi4yMTMsMjUuNiwzMC43MiwyNS42aDE0OC40OCAgYzUuMTIsMCw4LjUzMywzLjQxMyw4LjUzMyw4LjUzM1MyMDEuMzg3LDM3NS40NjcsMTk2LjI2NywzNzUuNDY3Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGREM3OTQ7IiBkPSJNMzc1LjQ2Nyw1MTJMMjYzLjY4LDM5Ni44Yy00MC4xMDctNDAuMTA3LTQwLjEwNy0xMDQuOTYsMC0xNDUuMDY3bDAsMCAgYzQwLjEwNy00MC4xMDcsMTA0Ljk2LTQwLjEwNywxNDUuMDY3LDBMNTEyLDM0OS44NjdWNTEySDM3NS40Njd6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkU5RUM7IiBkPSJNMjg4LjQyNywzNzIuOTA3bDM1Ljg0LDM1Ljg0YzQuMjY3LDQuMjY3LDkuMzg3LDUuOTczLDE1LjM2LDUuOTczICBjNDYuOTMzLTMuNDEzLDgzLjYyNy00MC4xMDcsODcuMDQtODcuMDRsMCwwYzAtNS45NzMtMS43MDctMTEuMDkzLTUuOTczLTE1LjM2bC0zNS44NC0zNS44NGMtMjYuNDUzLTI2LjQ1My02OS45NzMtMjYuNDUzLTk2LjQyNywwICBsMCwwQzI2MS4xMiwzMDIuOTMzLDI2MS4xMiwzNDUuNiwyODguNDI3LDM3Mi45MDciLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNjYuOTMzLDM1NC4xMzNjLTE2LjIxMywxNi4yMTMtMjQuNzQ3LDQwLjk2LTM0Ljk4Nyw1OC44OGMyLjU2LDAuODUzLDUuMTIsMS43MDcsOC41MzMsMC44NTMgIGM0Ni45MzMtMy40MTMsODMuNjI3LTQwLjEwNyw4Ny4wNC04Ny4wNGMwLTIuNTYsMC00LjI2Ny0wLjg1My02LjgyN2gtMC44NTNDNDA3LjA0LDMzMS4wOTMsMzgzLjE0NywzMzcuMDY3LDM2Ni45MzMsMzU0LjEzMyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjlBNjcxOyIgZD0iTTQxOC4xMzMsNDc3Ljg2N2MtMi41NiwwLTQuMjY3LTAuODUzLTUuOTczLTIuNTZjLTMuNDEzLTMuNDEzLTMuNDEzLTguNTMzLDAtMTEuOTQ3bDU1LjQ2Ny01NS40NjcgIGMzLjQxMy0zLjQxMyw4LjUzMy0zLjQxMywxMS45NDcsMGMzLjQxMywzLjQxMywzLjQxMyw4LjUzMywwLDExLjk0N2wtNTUuNDY3LDU1LjQ2N0M0MjIuNCw0NzcuMDEzLDQyMC42OTMsNDc3Ljg2Nyw0MTguMTMzLDQ3Ny44NjcgICIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNDhBMERDOyIgZD0iTTIyMS44NjcsMTE4LjYxM3YxMjEuMTczbDg3LjA0LTYwLjU4N0wyMjEuODY3LDExOC42MTN6IE0yMTMuMzMzLDI2NC41MzMgIGMtMS43MDcsMC0yLjU2LDAtNC4yNjctMC44NTNjLTIuNTYtMS43MDctNC4yNjctNC4yNjctNC4yNjctNy42OFYxMDIuNGMwLTMuNDEzLDEuNzA3LTUuOTczLDQuMjY3LTcuNjhzNS45NzMtMC44NTMsOC41MzMsMC44NTMgIGwxMTAuOTMzLDc2LjhjMi41NiwxLjcwNywzLjQxMyw0LjI2NywzLjQxMyw2LjgyN3MtMS43MDcsNS4xMi0zLjQxMyw2LjgyN2wtMTEwLjkzMyw3Ni44ICBDMjE2Ljc0NywyNjMuNjgsMjE1LjA0LDI2NC41MzMsMjEzLjMzMywyNjQuNTMzTDIxMy4zMzMsMjY0LjUzM3oiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />'
var pauseButton =  '<img id="pause-play" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRUQ3MTYxOyIgZD0iTTI3My4wNjcsMjEzLjMzM2MtNS4xMiwwLTguNTMzLTMuNDEzLTguNTMzLTguNTMzVjkzLjg2N2g1MS4ydjkzLjg2NyAgIGMwLDUuMTItMy40MTMsOC41MzMtOC41MzMsOC41MzNzLTguNTMzLTMuNDEzLTguNTMzLTguNTMzdi03Ni44SDI4MS42VjIwNC44QzI4MS42LDIwOS4wNjcsMjc4LjE4NywyMTMuMzMzLDI3My4wNjcsMjEzLjMzMyIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0VENzE2MTsiIGQ9Ik0yMDQuOCwyNjQuNTMzYy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzNWOTMuODY3aDUxLjJWMjMwLjRjMCw1LjEyLTMuNDEzLDguNTMzLTguNTMzLDguNTMzICAgYy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzNWMTEwLjkzM2gtMTcuMDY3VjI1NkMyMTMuMzMzLDI2MS4xMiwyMDkuOTIsMjY0LjUzMywyMDQuOCwyNjQuNTMzIi8+CjwvZz4KPHBhdGggc3R5bGU9ImZpbGw6IzU1NjA4MDsiIGQ9Ik0xOTYuMjY3LDM3NS40NjdINDcuNzg3QzI0Ljc0NywzNzUuNDY3LDAsMzU5LjI1MywwLDMzMi44VjQ2LjkzM0MwLDIyLjE4NywyMy4wNCwwLDQ3Ljc4NywwaDQxNy4yOCAgQzQ4OS44MTMsMCw1MTIsMjIuMTg3LDUxMiw0Ni45MzN2MjQzLjJjMCw1LjEyLTMuNDEzLDguNTMzLTguNTMzLDguNTMzYy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzN2LTI0My4yICBjMC0xNS4zNi0xNC41MDctMjkuODY3LTI5Ljg2Ny0yOS44NjdINDcuNzg3Yy0xNS4zNiwwLTMwLjcyLDE0LjUwNy0zMC43MiwyOS44NjdWMzMyLjhjMCwxNS4zNiwxNi4yMTMsMjUuNiwzMC43MiwyNS42aDE0OC40OCAgYzUuMTIsMCw4LjUzMywzLjQxMyw4LjUzMyw4LjUzM1MyMDEuMzg3LDM3NS40NjcsMTk2LjI2NywzNzUuNDY3Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGREM3OTQ7IiBkPSJNMzc1LjQ2Nyw1MTJMMjYzLjY4LDM5Ni44Yy00MC4xMDctNDAuMTA3LTQwLjEwNy0xMDQuOTYsMC0xNDUuMDY3bDAsMCAgYzQwLjEwNy00MC4xMDcsMTA0Ljk2LTQwLjEwNywxNDUuMDY3LDBMNTEyLDM0OS44NjdWNTEySDM3NS40Njd6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkU5RUM7IiBkPSJNMjg4LjQyNywzNzIuOTA3bDM1Ljg0LDM1Ljg0YzQuMjY3LDQuMjY3LDkuMzg3LDUuOTczLDE1LjM2LDUuOTczICBjNDYuOTMzLTMuNDEzLDgzLjYyNy00MC4xMDcsODcuMDQtODcuMDRsMCwwYzAtNS45NzMtMS43MDctMTEuMDkzLTUuOTczLTE1LjM2bC0zNS44NC0zNS44NGMtMjYuNDUzLTI2LjQ1My02OS45NzMtMjYuNDUzLTk2LjQyNywwICBsMCwwQzI2MS4xMiwzMDIuOTMzLDI2MS4xMiwzNDUuNiwyODguNDI3LDM3Mi45MDciLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNjYuOTMzLDM1NC4xMzNjLTE2LjIxMywxNi4yMTMtMjQuNzQ3LDQwLjk2LTM0Ljk4Nyw1OC44OGMyLjU2LDAuODUzLDUuMTIsMS43MDcsOC41MzMsMC44NTMgIGM0Ni45MzMtMy40MTMsODMuNjI3LTQwLjEwNyw4Ny4wNC04Ny4wNGMwLTIuNTYsMC00LjI2Ny0wLjg1My02LjgyN2gtMC44NTNDNDA3LjA0LDMzMS4wOTMsMzgzLjE0NywzMzcuMDY3LDM2Ni45MzMsMzU0LjEzMyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjlBNjcxOyIgZD0iTTQxOC4xMzMsNDc3Ljg2N2MtMi41NiwwLTQuMjY3LTAuODUzLTUuOTczLTIuNTZjLTMuNDEzLTMuNDEzLTMuNDEzLTguNTMzLDAtMTEuOTQ3bDU1LjQ2Ny01NS40NjcgIGMzLjQxMy0zLjQxMyw4LjUzMy0zLjQxMywxMS45NDcsMGMzLjQxMywzLjQxMywzLjQxMyw4LjUzMywwLDExLjk0N2wtNTUuNDY3LDU1LjQ2N0M0MjIuNCw0NzcuMDEzLDQyMC42OTMsNDc3Ljg2Nyw0MTguMTMzLDQ3Ny44NjcgICIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />'


$('.pause-button').click( function() {
    paused = !paused;
    if (paused) {
      $('#song').trigger('pause');
      $('#pause-play').replaceWith(playButton);
    }
    else {
      $('#song').trigger('play');
      $('#pause-play').replaceWith(pauseButton);
    }
});



activeSong = document.getElementById("song");

activeSong.ontimeupdate = function() {
  var fractionOfSong = (activeSong.currentTime/activeSong.duration);
  // make a percentage
  width = (fractionOfSong * 100) + '%';
  // apply to player width
  $('.player').css('width', width);
}

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
        console.log(playerWidth);
        var divide = (playerWidth / draggedTo);
        var songTime = (activeSong.duration / divide);
        songTime = parseInt(songTime);
        activeSong.currentTime = songTime;
      }
    });
