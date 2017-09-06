
// BING IMAGE SEARCH - Use Microsoft's Bing Image Search API with ajax to provide an alternative
// (or improvement)? to image upload bound to item input or shop + item / shop by button request.


   // Replace the following string with the AppId you received from the
   // Bing Developer Center.
   var AppId = "AIzaSyCx-izqktV2ZBYy9kT_6yvI0BMUOYHP5zg";

   function Search(Query) {
    var params = {
        // Request parameters
        "q": Query,
        "count": "10",
        "offset": "0",
        "mkt": "en-us",
        "safeSearch": "Moderate",
    };

    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", AppId);
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        $('#output').html('')
        var result;
        for (i = 0; i < data.value.length ; i++) {
          result = data.value[i];
          add_img = '<img class ="bing-image" id="bing-image' + (i + 1)+ '" src="' + result.thumbnailUrl + '" />';
          $('#output').append(add_img);

          }
          $('.bing-image').click(function() {
            $('.bing-image').css('border', 'none')
            $(this).css('border', '2px solid black')
            var selectedImage = $(this).attr('src');
            $('#id_bing_image').val(selectedImage);
          });
        })
    .fail(function() {
        console.log("bing Image search error");
    });
};
