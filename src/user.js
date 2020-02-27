class User {
  constructor() {
    this.pendingRequests = []
  }

  findPendingRequests(travellerID, tripData) {
    let pendingTrips = tripData.filter(trip => trip.status === 'pending');
    pendingTrips.forEach(pendingTrip => {
      if (pendingTrip.userID === travellerID) {
        this.pendingRequests.push(pendingTrip)
      }
    });
  }
}

export default User;