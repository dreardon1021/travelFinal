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
        let tripTravelers = (this.findCurrentTrips(traveler.id, tripData));
        total += tripTravelers.travelers
      }
    })
    return total;
  }

  approveRequest(tripId) {
    let approvedTrip = {"id": parseInt(tripId), "status": "approved"}
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(approvedTrip),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error.message))
  }
}


export default Agent;