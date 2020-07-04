$(document).ready(() => {
    $.ajax({
        url: '/playlist',
        method: 'GET',
        datatype: 'json',
        success: (data) => {
            console.log(data);
            for (var i= 0; i < data.length; i++){
                var num = i
                $('.playlist').append(`
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                    <div class="row" style="padding-bottom: 20px;" >
                      <div class="col">
                        <p>${data[i].type}</p>
                        <h1><i>${data[i].name}</i></h1>
                        <p>Created by : ${data[i].owner.display_name} . ${data[i].tracks.total} songs</p>
                        <p>${data[i].description}</p>
                      </div>
                      <div class="col">
                        <img src="${data[i].images[0].url}" width="350" height="250">
                      </div>
                     </div>
      
                     </div>
                 </div>
                 
                  <div id = 'track' class = 'row'> 

                  </div>
                        

                 
                `)
                access_token = $('h6').text()
            $.ajax({
                
                url:data[i].tracks.href,
                headers: {
                    'Authorization': 'Bearer ' + access_token 
                  },
                method: 'GET',            
                datatype: 'json',
                success: (data1) =>{
                    console.log(data1)
                    
                     for(var j = 0; j<data1.items.length; j++){
                        $('#track').append(`
                        <div class="col-6 col-sm-4 col-md-4 col-lg-2 mb-2 ml-0 mt-5 search-song">
                    
                        <div class="card text-center" style="width: 12rem;">
                                <img class="card-img-top" id="songImageOne" src=${data1.items[j].track.album.images[0].url} alt="Card image cap">
                                <p>${data1.items[j].track.name}</p>
                                <p>${data1.items[j].track.artists[0].name}</p>
                                
                                 <a href="${data1.items[j].track.preview_url}" class="btn btn-primary" role="button">Preview Song</a>
                             
                            </div>
                         </div>
                        `)
                    } 
                }
            })
            

            }
        }

    })
})



