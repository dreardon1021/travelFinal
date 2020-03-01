import tripData from "./data/tripData";

class Trip {
  constructor(id, userId, destinationId, travelerCount, startDate, duration) {
    this.id = id;
    this.userID = userId;
    this.destinationID = destinationId;
    this.travelers = travelerCount;
    this.date = startDate;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];

  }

  calculateTripCost(destinationData) {
    let tripDestination = destinationData.find(destination => destination.id === this.destinationID);
    let lodgingTotal = this.duration * tripDestination.estimatedLodgingCostPerDay;
    let flightTotal = this.travelers * tripDestination.estimatedFlightCostPerPerson;
    let agencyFee = (lodgingTotal + flightTotal) * .10
    return lodgingTotal + flightTotal + agencyFee
  }

  bookTrip(trip) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  }
}

export default Trip;
