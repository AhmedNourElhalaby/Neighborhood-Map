 var locationList = [
          {title: 'al azhar park', address: 'Salah Salem St, El-Darb El-Ahmar, Cairo Governorate', location: {lat: 30.040523, lng: 31.264631}},
          {title: 'Cairo Tower', address: 'Zamalek, Cairo Governorate', location: {lat: 30.045916, lng: 31.224291}},
          {title: 'Al-Azhar Mosque', address: ' El-Darb El-Ahmar, Cairo Governorate', location: {lat: 30.04582977294922, lng: 31.26251983642578}},
          {title: 'Mosque of Muhammad Ali', address: 'Al Abageyah, Qism El-Khalifa, Cairo Governorate', location: {lat: 30.023833238, lng: 31.25583231}},
          {title: 'Cairo Citadel', address: 'Al Abageyah, Qesm Al Khalifah، Cairo Governorate', location: {lat: 30.024333236, lng: 31.256832306}},
          {title: 'Egyptian Museum', address: '15 Meret Basha, Ismailia, Qasr an Nile, Cairo Governorate', location: {lat: 30.047503, lng: 31.233702}}
        ];

var location

var map;
// Create a new blank array for all the listing markers.
var markers = [];
var largeInfowindow;

function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.05611, lng: 30.05611},
          zoom: 13
        });

 	largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

        // The following group uses the location array to create an array of markers on initialize.

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locationList.length; i++) {
         // Get the position from the location array.
        var position = locationList[i].location;
        var title = locationList[i].title;
        var address = locationList[i].address;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
        	map: map,
            position: position,
            title: title,
            address: address,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this);
          });

          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
          
        }
         var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);

        ko.applyBindings(new ViewModel());
      }
        
      
      function populateInfoWindow(marker) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (largeInfowindow.marker != marker) {
          largeInfowindow.marker = marker;
          largeInfowindow.setContent('<div>' + marker.title + '<br>' + marker.address +'</div>');
          largeInfowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          largeInfowindow.addListener('closeclick', function() {
            largeInfowindow.marker = null;
          });
        }

      }

       // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }



// ViewModel
var ViewModel = function() {
  var self = this;
  
  self.locationList = locationList;
  self.filter = ko.observable('');

  // filteredLocations is computed based on the filter observable
  // entered by the user
  this.filteredLocations = ko.computed(function() {
    return markers.filter(function(location) {
      return location.title.indexOf(self.filter()) !== -1;
    });
  });
};

