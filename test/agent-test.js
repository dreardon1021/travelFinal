import chai from 'chai';
import { expect } from 'chai';

import Agent from '../src/agent.js'
import User from '../src/user.js'
import tripData from '../src/data/tripData.js'
import destinationData from '../src/data/destinationData.js'
import travelerData from '../src/data/travelerData.js'


describe('Agent', function() {
  let agent;

  beforeEach(function() {
    agent = new Agent()
  })

  it('is a function', function() {
    expect(Agent).to.be.a('function');
  });

  it('should be an instance of Agent', function() {
    expect(agent).to.be.an.instanceof(Agent);
  });

  it('should be able to caluclate income', function() {
    expect(agent.calculateAgentIncome(travelerData, tripData, destinationData)).to.equal(1815);
  });

  it('should be able to calculate the number of current travelers', function() {
    expect(agent.calculateNumOfCurrentTravelers(travelerData, tripData)).to.equal(2);
  });
});