//async await introduced in ES7

//put async before to indicate the function has some async code
async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const jsonResponse = await res.json();
  
  console.log(jsonResponse);
}
fetchAlbums();

//another form using arrow functions
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const jsonResponse = await res.json();
  
  console.log(jsonResponse);
}
fetchAlbums();