// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates.js'
import Traveler from './traveler.js'
import Trip from './trip.js'
var moment = require('moment');

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';
import './images/beach.jpg';
import './images/airplane.png';


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

let userData;
let tripData;
let destinationData;
let traveler;
let trip;


fetchData().then(data => {
  userData = data.userData;
  tripData = data.tripData;
  destinationData = data.destinationData;
})
  .catch(error => console.log(error.message))


$('.login-button').click(loginUser)
$('.book-trip-button').click(bookTrip)
$('.get-estimate-button').click(getTripEstimate)
$('.start-date').change(enableButtons)
$('.duration').change(enableButtons)
$('.traveler').change(enableButtons)



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
    domUpdates.hide('.login-form');
  } else if (arrayOfFifty.includes(userInput) &&
    passwordInput === 'travel2020') {
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

function bookTrip() {
  $('#new-trip-form').submit(e => {
    e.preventDefault();
  })
  trip = new Trip(Date.now(), traveler.id, getDestinationID(destinationData), parseInt($('.traveler').val()), moment($('.start-date').val()).format('YYYY/MM/DD'), parseInt($('.duration').val()))
  trip.bookTrip(trip);
  setTimeout(() => {
    domUpdates.removeElement('#request-message')
    domUpdates.populateNewTrip(destinationData, trip)
  }, 1000);
}

function getDestinationID(destinationData) {
  let chosenDestination = $('#select-destination').val()
  let foundDestination = destinationData.find(destination => destination.destination === chosenDestination)
  return foundDestination.id
}

function getTripEstimate() {
  $('#new-trip-form').submit(e => {
    e.preventDefault();
  })
  trip = new Trip(Date.now(), traveler.id, getDestinationID(destinationData), parseInt($('.traveler').val()), moment($('.start-date').val()).format('YYYY/MM/DD'), parseInt($('.duration').val()))
  domUpdates.populateTripEstimate(destinationData, trip)
}


function enableButtons() {
  if ($('.start-date').val() !== '' && $('.duration').val() !== '' && $('.traveler').val() !== '') {
    $('.get-estimate-button').prop('disabled', false).removeClass('disabled').addClass('enabled')
    $('.book-trip-button').prop('disabled', false).removeClass('disabled').addClass('enabled')
  } else {
    $('.get-estimate-button').prop('disabled', 'disabled').removeClass('enabled').addClass('disabled')
    $('.book-trip-button').prop('disabled', 'disabled').removeClass('enabled').addClass('disabled')
  }
}