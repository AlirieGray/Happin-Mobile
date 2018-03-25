
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


      // get the distance between the user's location and the event's location
      // sort in ascending borderRadius
      return a.name < b.name ? 1 : -1;
    }
  })
}
