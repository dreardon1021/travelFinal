import $ from 'jquery'
import Trip from './trip.js'

const domUpdates = {

  hide: (target) => {
    $(target).hide();
  },

  displayTraveler: (target) => {
    $(target).css('display', 'flex');
    $(target).addClass('travelerFlex');
  },

  displayAgent: (target) => {
    $(target).css('display', 'flex');
    $(target).addClass('agentFlex');
  },

  populateDestinationDropDown: (destination) => {
    $('#select-destination').append(`<option value="${destination.destination}">${destination.destination}</option>`)
  },

  //If cannot be tested yet. Need to do a POST
  populateTravelerInfo: (traveler, travelerID, tripData, destinationData) => {
    if (traveler.findCurrentTrips(travelerID, tripData) !== undefined) {
      let tripDestination = destinationData.find(destination => traveler.findCurrentTrips(travelerID, tripData).destinationID === destination.id)
      $('.display-username').text(`Welcome ${traveler.name}, enjoy ${tripDestination.destination}!`)
    } else {
      $('.display-username').text(`Welcome ${traveler.name}!`)
    }
    $('.display-money').text(`You Spent $${traveler.calculateUserSpent(travelerID, tripData, destinationData)} This Year`)
  },

  populateUpcomingTrips: (traveler, travelerID, tripData, destinationData) => {
    let userTrips = traveler.findUserUpcomingTrips(travelerID, tripData)
    userTrips.forEach(trip => {
      if (trip.status === 'approved') {
        let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
        $('.upcoming-trip-cards').append(`
          <div class="trip-card">
            <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
            <h5>${foundDestination.destination}</h5>
            <div class="card-data">
              <ul>
                <li><strong>Travelers:</strong> ${trip.travelers}</li>
                <li><strong>Start Date:</strong> ${trip.date}</li>
                <li><strong>Duration:</strong> ${trip.duration}</li>
              </ul>
            </div>
          </div>`)
      }
    })
  },

  populatePastTrips: (traveler, travelerID, tripData, destinationData) => {
    let userTrips = traveler.findUserPastTrips(travelerID, tripData)
    userTrips.forEach(trip => {
      let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
      $('.past-trip-cards').append(`
        <div class="trip-card">
          <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
          <h5>${foundDestination.destination}</h5>
          <div class="card-data">
            <ul>
              <li><strong>Travelers:</strong> ${trip.travelers}</li>
              <li><strong>Start Date:</strong> ${trip.date}</li>
              <li><strong>Duration:</strong> ${trip.duration}</li>
            </ul>
          </div>
        </div>`)
    })
  },

  populatePendingRequests: (traveler, travelerID, tripData, destinationData) => {
    traveler.findPendingRequests(travelerID, tripData)
    if (traveler.pendingRequests.length !== 0) {
      let userTrips = traveler.pendingRequests;
      userTrips.forEach(trip => {
        let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
        $('.pending-trip-cards').append(`
        <div class="trip-card">
          <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
          <h5>${foundDestination.destination}</h5>
          <div class="card-data">
            <ul>
              <li><strong>Travelers:</strong> ${trip.travelers}</li>
              <li><strong>Start Date:</strong> ${trip.date}</li>
              <li><strong>Duration:</strong> ${trip.duration}</li>
            </ul>
          </div>
        </div>`)
      })
    } else {
      $('.pending-trip-cards').append(`<span id="request-message">Please Make Another Trip Request</span>`)
    }
  },

  populateTripEstimate: (destinationData, trip) => {
    $('.populated-estimate').text(`This trip costs $${trip.calculateTripCost(destinationData)}`)
  },

  populateNewTrip: (destinationData, trip) => {
    let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
    $('.pending-trip-cards').append(`
        <div class="trip-card">
          <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
          <h5>${foundDestination.destination}</h5>
          <div class="card-data">
            <ul>
              <li><strong>Travelers:</strong> ${trip.travelers}</li>
              <li><strong>Start Date:</strong> ${trip.date}</li>
              <li><strong>Duration:</strong> ${trip.duration}</li>
            </ul>
          </div>
        </div>`)
  },

  removeElement: (elementId)  => {
    $(elementId).remove()
  },

  //Start of agent dashboard functions
  populateRequestsForAgent: (traveler, tripData, destinationData) => {
    traveler.findPendingRequests(traveler.id, tripData)
    if (traveler.pendingRequests.length !== 0) {
      let userTrips = traveler.pendingRequests;
      userTrips.forEach(trip => {
        let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
        $('.agent-aside').append(`
        <div class="${trip.id} trip-card-pending-agent">
          <div class="card-header">
            <button class="approve">Approve</button>
            <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
            <button class="deny">Deny</button>
          </div>
          <h5>${foundDestination.destination}</h5>
          <div class="card-data">
            <ul>
              <li><strong>User Id:</strong> ${trip.userID}</li>
              <li><strong>Travelers:</strong> ${trip.travelers}</li>
              <li><strong>Start Date:</strong> ${trip.date}</li>
              <li><strong>Duration:</strong> ${trip.duration}</li>
            </ul>
          </div>
        </div>`)
      })
    }
  },

  populateAgentIncome: (agent, userData, tripData, destinationData) => {
    $('.display-money').text(`You made $${agent.calculateAgentIncome(userData, tripData, destinationData).toFixed(2)} this year`)
  },

  populateCurrentTravelers: (agent, userData, tripData) => {
    $('.display-username').text(`There are ${agent.calculateNumOfCurrentTravelers(userData, tripData)} travelers today`)
  },

  populateFoundUserInfo: (traveler, tripData, destinationData) => {
    $('.found-user-name').text(traveler.name);
    $('.found-user-spent').text(traveler.calculateUserSpent(traveler.id, tripData, destinationData))
  },

  populateFoundUserCurrentTrip: (traveler, tripData, destinationData) => {
    if (traveler.findCurrentTrips(traveler.id, tripData) !== undefined) {
      let currentTrip = traveler.findCurrentTrips(traveler.id, tripData)
      let foundDestination = destinationData.find(destination => destination.id === currentTrip.destinationID)
      $('.current-trip-cards').append(`
      <div class="trip-card">
        <img src=${foundDestination.image} class="card-background" alt="${foundDestination.destination}" />
        <h5>${foundDestination.destination}</h5>
        <div class="card-data">
          <ul>
            <li><strong>Travelers:</strong> ${currentTrip.travelers}</li>
            <li><strong>Start Date:</strong> ${currentTrip.date}</li>
            <li><strong>Duration:</strong> ${currentTrip.duration}</li>
          </ul>
        </div>
      </div>`)
    }
  }
}

export default domUpdates;