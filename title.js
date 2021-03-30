  
submit.addEventListener("click", movieTitle);


function movieTitle(e) {
  e.preventDefault();
  //clears previous search results to avoid conflicts with results without images
  for(let o=0; o<6; o++){
    document.getElementById(`title${o}`).innerHTML = ""
    document.getElementById(`book${o}`).src = ""
    document.getElementById(`desc${o}`).innerHTML = ""
  };
  var placeHolder = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas illo explicabo autem quia totam commodi animi eos nemo voluptatibus cumque."
  let title = search.value;

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
for(let i=0; i<6; i++){
  // api request to Search api
fetch(`https://openlibrary.org/search.json?title=${title}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
    document.getElementById(`title${i}`).innerHTML = result.docs[i].title;
    // isbn result from Search api used to link covers
    var isbn = result.docs[i].isbn[4]
    document.getElementById(`book${i}`).src = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
    var works = result.docs[i].key;
    // using Search api return, we called Works api to pull book description
    return fetch(`https://openlibrary.org${works}.json`, requestOptions)
  
  .then(response => response.json())
  .then((result) => {
  
    // if a title does not contain a description, a placeholder text will be displayed.
    if (result.description == undefined){
      document.getElementById(`desc${i}`).innerHTML = placeHolder
    }
    else{
    document.getElementById(`desc${i}`).innerHTML = result.description}
  });
})
  .catch(error => console.log('error', error));
}
document.getElementById('search').value='';

[].forEach.call(document.querySelectorAll('.row'), function (el) {
  el.style.visibility = 'visible';
});
}



