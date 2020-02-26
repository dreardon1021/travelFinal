// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scripts'

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

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

fetchData().then(data => {
  userData = data.userData;
  tripData = data.ingredientsData;
  destinationData = data.recipeData;
})
  .catch(error => console.log(error.message))

