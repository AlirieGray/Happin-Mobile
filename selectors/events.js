
function getDistanceToEvent(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  d = d * 0.621371;
  return Math.round(d * 10) / 10;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


// takes in two arguments: an array of events and the filters to apply to those events
export default (events, { text, sortBy, startDate, endDate}, position ) => {
  return events.filter((event) => {

    // see if event name or description includes search bar text
    const textMatch = event.description.toLowerCase().includes(text.toLowerCase()) || event.name.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') { // TODO: come up with a better way to do this.... store the date as a Date object earlier?
      console.log(a.date)
      var dateSectionsA = a.date.split('/');
      var dateSectionsB = b.date.split('/');
      var eventDateA = new Date(dateSectionsA[2], dateSectionsA[0] - 1, dateSectionsA[1]);
      var eventDateB = new Date(dateSectionsB[2], dateSectionsB[0] - 1, dateSectionsB[1]);
      return eventDateA < eventDateB ? -1 : 1;
    }
    else if (sortBy === 'name') {
      return a.name < b.name ? -1 : 1;
    } else if (sortBy === 'distance') {
      console.log("sorting by distance")
      console.log("position in selector: ", position)

      const eventLatLng = { lat: a.lat, lng: a.lng };
      console.log("Event lat lng: ", eventLatLng);

      var distanceA = getDistanceToEvent(a.lat, a.lng, position.latitude, position.longitude);
      var distanceB = getDistanceToEvent(b.lat, b.lng, position.latitude, position.longitude);


      // get the distance between the user's location and the event's location
      // sort in ascending borderRadius
      return distanceA > distanceB ? 1 : -1;
    }
  })
}
