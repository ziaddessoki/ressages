$(document).ready(function () {
   
    var tags = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
    $(document).on("click",".w",searchGiphy);
    addButton();
    searchGiphy();

      function searchGiphy() {
        $("#images").empty();
         var tag = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=OMySCUA9XjxGmOYiuVoKIf0iKdmJooeA&q=' + tag + '&limit=10&offset=0&&lang=en';
        
        $.ajax({ 
            url: queryURL, 
            method: "GET" 
        }).then(function (response) {
            // console.log(response);
            var results = response.data;
            
            
           for(var j=0;j<results.length;j++){ 
            
            var gifDiv = $("<div>");
            var rating = results[j].rating.toUpperCase();
            var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.addClass("s")
            personImage.attr("src", results[j].images.fixed_height.url);
            personImage.attr("data-animate", results[j].images.fixed_height.url);
            personImage.attr("data-still", results[j].images.fixed_height_still.url);
            
            gifDiv.append(personImage);
            gifDiv.append(p);
            gifDiv.append(pTitle);
            //here where we gonna manipulate the dom
            // $(".images").empty(); //this work but inly 1 image is displayed
            $("#images").prepend(gifDiv); 


            }
        });
    };
    function addButton() {

        $(".icons").empty();

        for (var i = 0; i < tags.length; i++) {

            var z = $("<button>");
            z.addClass("w");
            z.attr("data-name", tags[i]);
            z.text(tags[i]);
            $(".icons").append(z)
        }
    }

    $(".add-tag").on("click",function(event){
        
        event.preventDefault();

        var tag =$(".tag-input").val().trim();
        
        $(".tag-input").val("");

        if (tags.toString().toLowerCase().indexOf(tag.toLowerCase()) != -1) {
            alert("Topic already exists");
          }
          else {
            tags.push(tag);
            // searchGiphy();
            addButton();
          }
       
        
        
        
    })

    

    $(document).on("click",".s", function() {
      
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }); 
    
    

});