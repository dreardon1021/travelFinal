import destinationData from './data/destinationData';

var moment = require('moment');

class User {
  constructor() {
    this.pendingRequests = []
  }

  findPendingRequests(travelerID, tripData) {
    let pendingTrips = tripData.filter(trip => trip.status === 'pending');
    pendingTrips.forEach(pendingTrip => {
      if (pendingTrip.userID === travelerID) {
        this.pendingRequests.push(pendingTrip)
      }
    });
  }

  findUserPastTrips(travelerID, tripData) {
    let previousTrips = []
    let userTrips = tripData.filter(vacation => vacation.userID === travelerID);
    userTrips.forEach(trip => {
      let joinedDate = trip.date.split('').filter(element => element !== '/').join('')
      let comparison = moment(joinedDate, "YYYYMMDD").fromNow();
      if (comparison.includes('ago')) {
        previousTrips.push(trip)
      }
    })
    return previousTrips
  }

  findUserUpcomingTrips(travelerID, tripData) {
    let upcomingTrips = [];
    let userTrips = tripData.filter(vacation => vacation.userID === travelerID);
    userTrips.forEach(trip => {
      let joinedDate = trip.date.split('').filter(element => element !== '/').join('')
      let comparison = moment(joinedDate, "YYYYMMDD").fromNow();
      if (comparison.includes('in')) {
        upcomingTrips.push(trip)
      }
    });
    return upcomingTrips
  }

  // findCurrentTrips(travelerID, tripData) {
  //   let stuff = moment().subtract(3, 'days').calendar();
  //   console.log(stuff)
  // }

  calculateUserSpent(travelerID, tripData, destinationData) {
    let userTrips = this.findUserPastTrips(travelerID, tripData);
    let cost = 0;
    userTrips.forEach(trip => {
      let arrivalSpot = destinationData.find(destination => destination.id === trip.destinationID );
      let costOfDestination = (arrivalSpot.estimatedLodgingCostPerDay * trip.duration) + (arrivalSpot.estimatedFlightCostPerPerson * trip.travelers);
      cost += costOfDestination;
    })
    return cost
  }
}

export default User;