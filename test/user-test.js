import chai from 'chai';
import { expect } from 'chai';

import User from '../src/user.js'
import tripData from '../src/data/tripData.js'


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
});