import tripData from "./data/tripData";

class Trip {
  constructor(id, userId, destinationId, travelerCount, startDate, duration) {
    this.id = id;
    this.userId = userId;
    this.destinationId = destinationId;
    this.travelers = travelerCount;
    this.date = startDate;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];

  }

  calculateTripCost(destinationData) {
    let tripDestination = destinationData.find(destination => destination.id === this.destinationId);
    let lodgingTotal = this.duration * tripDestination.estimatedLodgingCostPerDay;
    let flightTotal = this.travelers * tripDestination.estimatedFlightCostPerPerson;
    return lodgingTotal + flightTotal
  }
}

export default Trip;
