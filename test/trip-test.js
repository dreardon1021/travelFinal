import chai from 'chai';
import { expect } from 'chai';

import User from '../src/user.js'
import tripData from '../src/data/tripData.js'
import destinationData from '../src/data/destinationData.js'
import Trip from '../src/trip.js'


describe('Trip', function() {
  let trip;

  beforeEach(function() {
    trip = new Trip(100, 5, 4, 2, '2020/03/03', 7)
  })

  it('is a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should be able to have an id', function() {
    expect(trip.id).to.equal(100)
  })

  it('should be able to know what userId it belongs to', function() {
    expect(trip.userID).to.equal(5);
  })

  it('should be able to hold an id for destination', function() {
    expect(trip.destinationID).to.equal(4)
  })

  it('shold be able to know how many travlers are on the trip', function() {
    expect(trip.travelers).to.equal(2)
  })

  it('should be able to have a start date', function() {
    expect(trip.date).to.equal('2020/03/03')
  })

  it('should be able to know how long trip is', function() {
    expect(trip.duration).to.equal(7);
  })

  it('should start with a pending status', function() {
    expect(trip.status).to.equal('pending')
  })

  it('should start with an empty array for actvities', function() {
    expect(trip.suggestedActivities).to.deep.equal([])
  })

  it('should be able to calculate trip cost', function() {
    expect(trip.calculateTripCost(destinationData)).to.equal(1639)
  })
});