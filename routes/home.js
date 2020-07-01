var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId: '945d014c29324d778ea8420a4c38c1e6',
    clientSecret: '176cd38523fa43cab549712eff2d83a2'
  });

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
   
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
  
  router.get('/', (req, res) =>{
    spotifyApi.getAlbums(['2zkyMw73XzNXUQaXTb4cio', '4ceWEQarPyTyeb9TUeyLOG',
    '54NUwj7U1MOhA1ZGbnhiMz', '4neocSMt40stXKK2B8Sy2G',
    '6cunQQ7YZisYOoiFu2ywIq', '7LF4N7lvyDhrPBuCJ1rplJ',
    '6leYdBPs1XzfUgpc8xgeSi', '3RZxrS2dDZlbsYtMRM89v8', '7J5iE51Mk97Mf0BjjwYXUZ'], 
    (err, data) => {
        if (err) throw err;
            var firstAlbumImage = data.body.albums[0].images[0].url;
            var secondAlbumImage = data.body.albums[1].images[0].url;
            var thirdAlbumImage = data.body.albums[2].images[0].url;
            var fourthAlbumImage = data.body.albums[3].images[0].url;
            var fifthAlbumImage = data.body.albums[4].images[0].url;
            var sixthAlbumImage = data.body.albums[5].images[0].url;
            var seventhAlbumImage = data.body.albums[6].images[0].url;
            var eigthAlbumImage = data.body.albums[7].images[0].url;
            var ninthAlbumImage = data.body.albums[8].images[0].url;
            var firstAlbumName = data.body.albums[0].name;
            var secondAlbumName = data.body.albums[1].name;
            var thirdAlbumName = data.body.albums[2].name;
            var fourthAlbumName = data.body.albums[3].name;
            var fifthAlbumName = data.body.albums[4].name;
            var sixthAlbumName = data.body.albums[5].name;
            var seventhAlbumName = data.body.albums[6].name;
            var eigthAlbumName = data.body.albums[7].name;
            var ninthAlbumName = data.body.albums[8].name;

            res.render('index',{
                
                    title: 'Musify',
                    style:'index.css',
                    firstAlbumImage: firstAlbumImage,
                    secondAlbumImage: secondAlbumImage,
                    thirdAlbumImage: thirdAlbumImage,
                    fourthAlbumImage: fourthAlbumImage,
                    fifthAlbumImage: fifthAlbumImage,
                    sixthAlbumImage: sixthAlbumImage,
                    seventhAlbumImage: seventhAlbumImage,
                    eigthAlbumImage: eigthAlbumImage,
                    ninthAlbumImage: ninthAlbumImage,
                    firstAlbumName: firstAlbumName,
                    secondAlbumName: secondAlbumName,
                    thirdAlbumName: thirdAlbumName,
                    fourthAlbumName: fourthAlbumName,
                    fifthAlbumName: fifthAlbumName,
                    sixthAlbumName: sixthAlbumName,
                    seventhAlbumName: seventhAlbumName,
                    eigthAlbumName: eigthAlbumName,
                    ninthAlbumName: ninthAlbumName,
            })
    })
  })

module.exports= router