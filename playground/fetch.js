//fetch introduced in ES6
function fetchAlbums() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
        .then(res => res.json()) //res.json() gives response in json format and returns a promise
        .then(json => console.log(json));
}
fetchAlbums();