// Put your Last.fm API key here
var api_key = "61cb51af3fc756109f5fab10aa025a3c";

function sendRequest () {

    var artist = encodeURI(document.getElementById("form-input").value);

    var artistinfoxhr = new XMLHttpRequest();
    var artistinfomethod = "artist.getinfo";
    artistinfoxhr.open("GET", "proxy.php?method="+artistinfomethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    artistinfoxhr.setRequestHeader("Accept","application/json");
    artistinfoxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.artist ? ArtistInfo(json.artist): console.log('no data') ;
        }
    };
    artistinfoxhr.send(null);

    var similarxhr = new XMLHttpRequest();
    var SimilarartistMethod = "artist.getSimilar";
    similarxhr.open("GET", "proxy.php?method="+SimilarartistMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    similarxhr.setRequestHeader("Accept","application/json");
    similarxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.similarartists.artist ? SimilarArtists(json.similarartists.artist): console.log('no data') ;
        }
    };
    similarxhr.send(null);


    var topalbumsxhr = new XMLHttpRequest();
    var TopAlbumsMethod = "artist.getTopAlbums";
    topalbumsxhr.open("GET", "proxy.php?method="+TopAlbumsMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    topalbumsxhr.setRequestHeader("Accept","application/json");
    topalbumsxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            console.log(json);
            json.topalbums.album ? TopAlbums(json.topalbums.album): console.log("NO ALBUMS AVAILABLE!") ;
        }
    };
    topalbumsxhr.send(null);

}

function ArtistInfo(artist) {
    console.log("================artists");

    if(artist){

    document.getElementById("name").innerHTML = artist.name;
    document.getElementById("webpageurl").innerHTML = artist.url;
    document.getElementById("picture").src = artist.image[2]['#text'];
    document.getElementById("bio").innerHTML = artist.bio.content;
    console.log(artist);
    
   }
}

function TopAlbums(album) {
    
    console.log("================top albums");

    var heading = document.getElementById("top-albums").getElementsByTagName('h2')[0];
    var list = document.getElementById("top-albums").getElementsByTagName('ul')[0];
    heading.innerHTML = album ?  'Top albums' : 'NO ALBUMS';
    list.innerHTML = "";

    album.forEach(ta => {                                                         //top albums

        console.log(ta,"===========");
        var name = "<span>" + ta.name + "</span>";
        var img = "<img src = '" + ta.image[2]['#text'] + "' />";
        var listItem = "<li>" + name + "<br>" + img + "</li>";
        list.innerHTML += listItem;
    });
}
function SimilarArtists(artists) {
    
    console.log("================similar artists");
    var heading = document.getElementById("similar").getElementsByTagName('h2')[0];
    var list = document.getElementById("similar").getElementsByTagName('ul')[0];
    heading.innerHTML = 'Similar artists';
    list.innerHTML = "";

    artists.forEach(artist => {
        list.innerHTML += "<li>" + artist.name + "</li>"
    });
}

