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
  }

}

export default domUpdates;