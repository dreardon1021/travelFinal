import $ from 'jquery'

const domUpdates = {

  hide: (target) => {
    $(target).hide();
  },

  displayTraveler: (target) => {
    $(target).css('display', 'flex');
    $(target).addClass('travelerFlex');
  }

}

export default domUpdates;