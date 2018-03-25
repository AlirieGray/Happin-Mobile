
// takes in two arguments: an array of events and the filters to apply to those events
export default (events, { text, sortBy, startDate, endDate} ) => {
  return events.filter((event) => {

    // see if event name or description includes search bar text
    console.log("Filter Text: ", text)
    const textMatch = event.description.toLowerCase().includes(text.toLowerCase()) || event.name.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') { // TODO: come up with a better way to do this.... store the date as a Date object earlier?
      var dateSectionsA = a.date.split('-');
      var dateSectionsB = b.date.split('-');
      var eventDateA = new Date(dateSectionsA[0], dateSectionsA[1] - 1, dateSectionsA[2]);
      var eventDateB = new Date(dateSectionsB[0], dateSectionsB[1] - 1, dateSectionsB[2]);
      return eventDateA < eventDateB ? 1 : -1;
    }
  })
}
