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

  populateDestinationDropDown: (destination) => {
    $('#select-destination').append(`<option value="${destination.destination}">${destination.destination}</option>`)
  },

  //If cannot be tested yet. Need to do a POST
  populateTravelerInfo: (traveler, travelerID, tripData, destinationData) => {
    if (traveler.findCurrentTrips(travelerID, tripData)) {
      let tripDestination = destinationData.find(destination => traveler.findCurrentTrips(travelerID, tripData).destinationID === destination.id)
      $('.display-username').text(`Welcome ${traveler.name}, enjoy ${tripDestination.destination}!`)
    } else {
      $('.display-username').text(`Welcome ${traveler.name}!`)
    }
    $('.display-username').text(`Welcome ${traveler.name}!`)
    $('.display-money').text(`You Spent $${traveler.calculateUserSpent(travelerID, tripData, destinationData)} This Year`)
  },

  populateUpcomingTrips: (traveler, travelerID, tripData, destinationData) => {
    let userTrips = traveler.findUserUpcomingTrips(travelerID, tripData)
    userTrips.forEach(trip => {
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
      $('.pending-trip-cards').append(`<span>Please Make Another Trip Request</span>`)
    }
  }
}

export default domUpdates;