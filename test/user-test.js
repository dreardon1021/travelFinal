import chai from 'chai';
import { expect } from 'chai';

import User from '../src/user.js'
import tripData from '../src/data/tripData.js'
import destinationData from '../src/data/destinationData.js'


describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User()
  })

  it('is a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should start with an empty array for pending requests', function() {
    expect(user.pendingRequests).to.deep.equal([])
  })

  it('should be able to find pending requests', function() {
    user.findPendingRequests(1, tripData)
    expect(user.pendingRequests).to.deep.equal([{"id": 2, "userID": 1, "destinationID": 2, "travelers": 5, "date": "2020/10/04", "duration": 18, "status": "pending", "suggestedActivities": []}])
  })

  it('should be able to find previous trips for a user', function() {
    expect(user.findUserPastTrips(3, tripData)).to.deep.equal([{"id": 1, "userID": 3, "destinationID": 1, "travelers": 1, "date": "2019/09/16", "duration": 8, "status": "approved", "suggestedActivities": []}])
  })

  it('should be able to find upcoming trips', function() {
    expect(user.findUserUpcomingTrips(3, tripData)).to.deep.equal([{"id": 7, "userID": 3, "destinationID": 4, "travelers": 5, "date": "2020/05/28", "duration": 20, "status": "approved", "suggestedActivities": []}])
  })

  // it('should be able to find current trips', function() {
  //   expect(user.findCurrentTrips()).to.equal(0)
  // })

  it('should be able to calculate user expenditures', function() {
    expect(user.calculateUserSpent(5, tripData, destinationData)).to.equal(10450)
  });
});