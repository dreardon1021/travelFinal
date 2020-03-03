import chai from 'chai';
import { expect } from 'chai';
chai.use(spies)

import Agent from '../src/agent.js'
import User from '../src/user.js'
import tripData from '../src/data/tripData.js'
import destinationData from '../src/data/destinationData.js'
import travelerData from '../src/data/travelerData.js'
import spies from 'chai-spies'


describe('Agent', function() {
  let agent;
  global.window = {};

  beforeEach(function() {
    agent = new Agent()
    chai.spy.on(window, 'fetch', () => new Promise((resolve, reject) => {}));
  });

  this.afterEach(function () {
    chai.spy.restore();
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

  it('should be able to approve a pending trip request', function() {
    agent.approveRequest(1)

    expect(window.fetch).to.be.called(1);
  })

  it('should be able to deny a pending trip request', function() {
    agent.approveRequest(1)

    expect(window.fetch).to.be.called(1);
  })
});