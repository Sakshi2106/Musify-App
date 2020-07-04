$(document).ready(() => {
    $.ajax({
        url: "https://api.spotify.com/v1/recommendations?seed_tracks=" + $('#first').text() + "," + $('#second').text() + "," + $('#third').text() + ',' + $('#fourth').text() + ',' + $('#fifth').text(),
        headers: {
            'Authorization': 'Bearer ' + $('#token').text() 
          },
        method: 'GET',
        datatype: 'json',
        success: (data) => {
            console.log(data)
            for(var i = 0; i < data.tracks.length; i++){
                $('#recommendations').append(`
                        <div class="col-6 col-sm-4 col-md-4 col-lg-2 mb-2 ml-0 mt-5 search-song">
                    
                        <div class="card text-center" style="width: 12rem;">
                                <img class="card-img-top" id="songImageOne" src=${data.tracks[i].album.images[0].url} alt="Card image cap">
                                <p>${data.tracks[i].name}</p>
                                <p>${data.tracks[i].artists[0].name}</p>
                                
                                 <a href="${data.tracks[i].preview_url}" class="btn btn-primary" role="button">Preview Song</a>
                             
                            </div>
                         </div>
                        `)
            }
        }
        
    })
})