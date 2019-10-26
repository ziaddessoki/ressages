$(document).ready(function () {

    var tags = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];


      function searchGiphy() {
         var tag = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=OMySCUA9XjxGmOYiuVoKIf0iKdmJooeA&q=' + tag + '&limit=25&offset=0&rating=R&lang=en';

        $.ajax({ 
            url: queryURL, 
            method: "GET" 
        }).then(function (response) {
            console.log(response);
            var results = response.data;


           for(var j=0;j<results.length;j++){ 
            
            var gifDiv = $("<div>");
            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.attr("src", results[j].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(personImage);
            //here where we gonna manipulate the dom
            $(".images").append(gifDiv); 


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
        
        $(".tag-input").val("")
        tags.push(tag);
        addButton();
        searchGiphy();
    })

    

      $(document).on("click",".w",searchGiphy);

    addButton();
    // searchGiphy();
});