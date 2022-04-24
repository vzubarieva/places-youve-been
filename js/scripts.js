function PlacesDataBase() {
  this.places = {};
  this.currentId = 0
}

PlacesDataBase.prototype.addPlace = function (place) {
  place.id = this.assignId();
  this.places[place.id] = place;
};

PlacesDataBase.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

PlacesDataBase.prototype.findPlace = function (id) {
  if (this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
};


function Place(location, landmarks, capitol, season) {
  this.location = location;
  this.landmarks = landmarks;
  this.capitol = capitol;
  this.season = season;
}

let placesDataBase = new PlacesDataBase();

function displayPlaceDetails(placesBookToDisplay) {
  let placesList = $("ul#placesGone");
  let htmlForPlacesInfo = "";
  Object.keys(placesBookToDisplay.places).forEach(function (key) {
    const place = placesBookToDisplay.findPlace(key);
    htmlForPlacesInfo += "<li id=" + place.id + ">" + place.location + " " + place.landmarks + " " + place.capitol + " " + place.season + " </li>";
  });
  placesList.html(htmlForPlacesInfo);
}

$(document).ready(function () {
  $("form#new-place").submit(function (event) {
    event.preventDefault();
    const newLocation = $("input#new-location").val();
    const newLandmark = $("input#new-landmark").val();
    const newCapitol = $("input#new-capitol").val();
    const newSeason = $("input#new-season").val();
    let newPlace = new Place(newLocation, newLandmark, newCapitol, newSeason);
    placesDataBase.addPlace(newPlace);
    displayPlaceDetails(placesDataBase);
  });
})