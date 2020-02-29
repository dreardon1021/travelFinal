import $ from 'jquery'

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

  populateTravelerInfo: (traveler, travelerID, tripData, destinationData) => {
    $('.display-username').text(`Welcome ${traveler.name}!`)
    $('.display-money').text(`You Spent $${traveler.calculateUserSpent(travelerID, tripData, destinationData)} This Year`)
  },

  populateUpcomingTrips: () => {
    
  }

}

export default domUpdates;