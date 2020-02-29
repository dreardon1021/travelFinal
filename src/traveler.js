import User from './user.js'

class Traveler extends User {
  constructor(travelerObj) {
    super()
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.travelerType = travelerObj.travelerType;
  }
}


export default Traveler;