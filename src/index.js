//imports and requires
import $ from 'jquery';
import domUpdates from './domUpdates.js'
import Traveler from './traveler.js'
import Trip from './trip.js'
var moment = require('moment');
import './css/base.scss';
import './images/beach.jpg';
import './images/airplane.png';
import './images/magnifying-glass.png';
import Agent from './agent.js';


function fetchData() {
  let travelerData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    .then((response) => response.json())
    .catch(error => console.log(error.message));
  let tripData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    .then((response) => response.json())
    .catch(error => console.log(error.message));
  let destinationData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    .then((response) => response.json())
    .catch(error => console.log(error.message));

  return Promise.all([travelerData, tripData, destinationData])
    .then(response => {
      let dataObj = {};
      dataObj.userData = response[0].travelers;
      dataObj.tripData = response[1].trips;
      dataObj.destinationData = response[2].destinations;
      return dataObj;
    })
    .catch(error => console.log(error.message))
}

//Global Vars
let userData;
let tripData;
let destinationData;
let traveler;
let trip;
let agent;

//Fetchd Data
fetchData().then(data => {
  userData = data.userData;
  tripData = data.tripData;
  destinationData = data.destinationData;
})
  .catch(error => console.log(error.message))

//Event Listeners
$('.login-button').click(loginUser)
$('.book-trip-button').click(bookTrip)
$('.get-estimate-button').click(getTripEstimate)
$('.start-date').change(enableButtons)
$('.duration').change(enableButtons)
$('.traveler').change(enableButtons)
$('.search-button').click(searchUserFunctions)



// Login and population
function loginUser() {
  $('.login-form').submit(e => {
    e.preventDefault();
  })
  let arrayOfFifty = []
  for (let i = 0; i < 50; i++) {
    arrayOfFifty.push(`traveler${i + 1}`);
  }
  let userInput = $('#user-name').val();
  let passwordInput = $('#password').val();
  if (userInput === 'agency' && passwordInput === 'travel2020') {
    domUpdates.hide('.login-page');
    domUpdates.displayAgent('.agent-dashboard')
    populateAgentDash()
  } else if (arrayOfFifty.includes(userInput) && passwordInput === 'travel2020') {
    traveler = new Traveler(extractUserId(userInput))
    domUpdates.hide('.login-page');
    domUpdates.displayTraveler('.traveler-dashboard')
    populateDestinationSelect(destinationData)
    domUpdates.populateTravelerInfo(traveler, traveler.id, tripData, destinationData)
    domUpdates.populateUpcomingTrips(traveler, traveler.id, tripData, destinationData)
    domUpdates.populatePastTrips(traveler, traveler.id, tripData, destinationData)
    domUpdates.populatePendingRequests(traveler, traveler.id, tripData, destinationData)
  } else {
    $('.login-error').text(`Please enter in a valid user name and login`)
  }
}

//helper function in login
function populateDestinationSelect(destinationData) {
  destinationData.forEach(destination => {
    domUpdates.populateDestinationDropDown(destination)
  })
}

//helper function in login
function extractUserId(userInput) {
  if (userInput.length === 10) {
    let id = userInput.split('').splice(-2, 2).join('');
    return userData.find(user => user.id === parseInt(id))
  } else if (userInput.length === 9) {
    let id = userInput.split('').splice(-1, 1);
    return userData.find(user => user.id === parseInt(id))
  }
}

//helper function for traveler population


//Booktrip, instantiate new trip, call from trip and domUpdates
function bookTrip() {
  $('#new-trip-form').submit(e => {
    e.preventDefault();
  })
  trip = new Trip(Date.now(), traveler.id, getDestinationID(destinationData), parseInt($('.traveler').val()), moment($('.start-date').val()).format('YYYY/MM/DD'), parseInt($('.duration').val()))
  trip.submitRequest(trip);
  setTimeout(() => {
    domUpdates.removeElement('#request-message')
    domUpdates.populateNewTrip(destinationData, trip)
  }, 1000);
}

//helper function
function getDestinationID(destinationData) {
  let chosenDestination = $('#select-destination').val()
  let foundDestination = destinationData.find(destination => destination.destination === chosenDestination)
  return foundDestination.id
}

//get trip cost
function getTripEstimate() {
  $('#new-trip-form').submit(e => {
    e.preventDefault();
  })
  trip = new Trip(Date.now(), traveler.id, getDestinationID(destinationData), parseInt($('.traveler').val()), moment($('.start-date').val()).format('YYYY/MM/DD'), parseInt($('.duration').val()))
  domUpdates.populateTripEstimate(destinationData, trip)
}

//enable and disable buttons based on form validity
function enableButtons() {
  if ($('.start-date').val() !== '' && $('.duration').val() !== '' && $('.traveler').val() !== '') {
    $('.get-estimate-button').prop('disabled', false).removeClass('disabled').addClass('enabled')
    $('.book-trip-button').prop('disabled', false).removeClass('disabled').addClass('enabled')
  } else {
    $('.get-estimate-button').prop('disabled', 'disabled').removeClass('enabled').addClass('disabled')
    $('.book-trip-button').prop('disabled', 'disabled').removeClass('enabled').addClass('disabled')
  }
}

//Start of Agent functions and helper functions
function populateAgentDash() {
  agent = new Agent();
  userData.forEach(user => {
    traveler = new Traveler(user)
    domUpdates.populateRequestsForAgent(traveler, tripData, destinationData);
    domUpdates.populateAgentIncome(agent, userData, tripData, destinationData);
    domUpdates.populateCurrentTravelers(agent, userData, tripData);
  })
}

//agent search functions
function searchUserFunctions() {
  traveler = new Traveler(searchUser())
  domUpdates.populateFoundUserInfo(traveler, tripData, destinationData)
  domUpdates.removeElement('.please-search-message');
  domUpdates.removeElement('.agent-trip-card');
  domUpdates.populateFoundUserCurrentTrip(traveler, tripData, destinationData)
}

function searchUser() {
  if (userData.find(user => user.id === parseInt($('.search-input').val()))) {
    return userData.find(user => user.id === parseInt($('.search-input').val()))
  } else if (userData.find(user => user.name.toLowerCase() === $('.search-input').val().toLowerCase())) {
    return (userData.find(user => user.name.toLowerCase() === $('.search-input').val().toLowerCase()))
  }
}