$("#search").on('click',  (e) => {
    e.preventDefault();
    $('#layout-row').html("");
    data = $("#search-keywords").val();
    access_token = $('#token').text();
    console.log(access_token)
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + data  + "&type=track",
        headers: {
            'Authorization': 'Bearer ' + access_token 
          },
        method: "GET",
        datatype: "json",
        success: function (data) {
            console.log(data)
        //     for (var i = 0; i < data.length; i++) {
        //         console.log(data[i].album.images[0].url);
        //         if (data[i].preview_url === null) {
        //             i++;
        //         } else {
        //             $('#layout-row').append(`<div class="col-6 col-sm-4 col-md-4 col-lg-2 mb-2 ml-0 mt-5 search-song">
        //                <div class="card text-center" style="width: 12rem;">
        //                    <img class="card-img-top" id="songImageOne" src=${data[i].album.images[0].url} alt="Card image cap">
        //                    <div class="overlay" data=${data[i].preview_url} data1=${data[i].album.images[0].url}
        //                      data2="${data[i].name}">
        //                    </div>
        //                    <h5 class="album-name pt-4 pb-2" id="songNameOne" value="{{firstAlbumName}}">${data[i].name}</h5>
        //                </div>
        //            </div>`);
        //         }
        //     }
         }
    });
});