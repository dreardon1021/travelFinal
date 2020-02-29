import chai from 'chai';
import { expect } from 'chai';

import Traveler from '../src/traveler.js'
import tripData from '../src/data/tripData.js'
import destinationData from '../src/data/destinationData.js'
import travelerData from '../src/data/travelerData.js'

describe('Traveler', function() {
  let traveler;

  beforeEach(function() {
    traveler = new Traveler(travelerData[0], tripData);
  });

  it('is a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should have an id', function() {
    expect(traveler.id).to.equal(1)
  });

  it('should hava a name', function() {
    expect(traveler.name).to.equal('Ham Leadbeater')
  });

  it('should have a traveler type', function() {
    expect(traveler.travelerType).to.equal('relaxer')
  });

})