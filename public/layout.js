$("#search").on('click',  (e) => {
    e.preventDefault();
    $('#layout-row').html("");
    query = $("#search-keywords").val();
    access_token = $('#token').text();
    console.log(access_token)
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + query  + "&type=album,track",
        headers: {
            'Authorization': 'Bearer ' + access_token 
          },
        method: "GET",
        datatype: "json",
        success: function (data) {
            console.log(data.albums.items)
            console.log(data.tracks.items)
            for (var i = 0; i < data.albums.items.length; i++) {
                
                {
                    $('#layout-row').append(`<div class="col-6 col-sm-4 col-md-4 col-lg-2 mb-2 ml-0 mt-5 search-song">
                    
                   <div class="card text-center" style="width: 12rem;">
                           <img class="card-img-top" id="songImageOne" src=${data.albums.items[i].images[0].url} alt="Card image cap">
                           
                           <h5 class="album-name pt-4 pb-2" id="songNameOne" value="{{firstAlbumName}}">${data.albums.items[i].name}</h5>
                        
                       </div>
                    </div>`);
                 }
             }


             for (var i = 0; i < data.tracks.items.length; i++) {
                
                if (data.tracks.items[i].preview_url === null) {
                   i++;
                } else {
                    $('#layout-row').append(`<div class="col-6 col-sm-4 col-md-4 col-lg-2 mb-2 ml-0 mt-5 search-song">
                    
                   <div class="card text-center" style="width: 12rem;">
                           <img class="card-img-top" id="songImageOne" src=${data.tracks.items[i].album.images[0].url} alt="Card image cap">
                           
                           <h5 class="album-name pt-4 pb-2" id="songNameOne" value="{{firstAlbumName}}">${data.tracks.items[i].name}</h5>
                           
                       </div>
                    </div>`);
                 }
             }
         }
    });
});
