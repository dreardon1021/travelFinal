import User from './user.js'

class Agent extends User {
  constructor() {
    super()
  }

  calculateAgentIncome(travelerData, tripData, destinationData) {
    let totalSpentByUsers = 0;
    travelerData.forEach(traveler => {
      let userSpent = this.calculateUserSpent(traveler.id, tripData, destinationData);
      totalSpentByUsers += userSpent;
    });
    return totalSpentByUsers * .10;
  }

  calculateNumOfCurrentTravelers(travelerData, tripData) {
    let total = 0;
    travelerData.forEach(traveler => {
      if (this.findCurrentTrips(traveler.id, tripData)) {
        // console.log((this.findCurrentTrips(traveler.id, tripData)))
        let tripTravelers = (this.findCurrentTrips(traveler.id, tripData));
        total += tripTravelers.travelers
      }
    })
    return total;
  }
};

export default Agent;