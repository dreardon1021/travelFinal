// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates.js'

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
      dataObj.userData = response[0];
      dataObj.tripData = response[1];
      dataObj.destinationData = response[2];
      // console.log(dataObj)
      return dataObj;
    })
    .catch(error => console.log(error.message))
}

let userData;
let tripData;
let destinationData;

let arrayOfFifty = []
for (let i = 0; i < 50; i++) {
  arrayOfFifty.push(`traveler${i + 1}`);
}

fetchData().then(data => {
  userData = data.userData;
  tripData = data.tripData;
  destinationData = data.destinationData;
})
  .catch(error => console.log(error.message))


$('.login-button').click(loginUser)

function loginUser() {
  $('.login-form').submit(e => {
    e.preventDefault();
  })
  let userInput = $('#user-name').val();
  let passwordInput = $('#password').val();
  if (userInput === 'agency' && passwordInput === 'travel2020') {
    domUpdates.hide('.login-form')
  } else if (arrayOfFifty.includes(userInput) &&
    passwordInput === 'travel2020') {
    domUpdates.hide('.login-form');
    //let traveler = new traveler(userData[userInput])
  } else {
    $('.login-error').append(`<p>Please enter in a valid user name and login</p>`)
  }
}

