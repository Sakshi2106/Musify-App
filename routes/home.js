var express = require('express');
var router = express.Router();
var request = require('request')

var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '945d014c29324d778ea8420a4c38c1e6'; // Your client id
var client_secret = '176cd38523fa43cab549712eff2d83a2'; // Your secret
var redirect_uri = 'http://localhost:8888/callback';
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// var get_token = (optionsall, callback) => {
//     request.post(optionsall, (err, response) => {
//         if (!err && response.statusCode === 200){
//             callback(undefined, {token : response.body.access_token});
//         }
//     })
// }

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.get('', (req, res) => {
  res.render('home.hbs')
})


router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }) );
    console.log(req.query.code);
    var code = req.query.code ;
    var state = req.query.state ;
    console.log(code)
    console.log(state)
});

router.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code ;
  var state = req.query.state ;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(code)
  console.log(state)
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      })
      );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        console.log(access_token)
        var options = {
          url: 'https://api.spotify.com/v1/albums/?ids=2zkyMw73XzNXUQaXTb4cio,4ceWEQarPyTyeb9TUeyLOG,54NUwj7U1MOhA1ZGbnhiMz,4neocSMt40stXKK2B8Sy2G,6cunQQ7YZisYOoiFu2ywIq,7LF4N7lvyDhrPBuCJ1rplJ,6leYdBPs1XzfUgpc8xgeSi,3RZxrS2dDZlbsYtMRM89v8,7J5iE51Mk97Mf0BjjwYXUZ',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, (err, data) => {
          
          if (err) throw error;
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

            res.render('index', {
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
            });

        });
      }
    });
    }
        // we can also pass the token to the browser to make requests from ther
});



  
  

    
    router.get('/search/:data', (req, res) => {
      console.log('search word' + req.params.data);
      console.log(req)
      spotifyApi.searchTracks(req.params.data)
        .then((data) => {
            res.send(data.body.tracks.items);
        }, (err) => {
          console.log(err)
        })
    })

  

module.exports= router