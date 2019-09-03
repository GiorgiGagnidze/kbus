const HttpStatus = require('http-status-codes');

const KMap = require('../interfaces/KMap');
const Location = require('./Location');

const DELIMITER = "#";

class LocationMap extends KMap {

  constructor() {
    super();

    this.map = {};

    this.initialize();
  }

  initialize = async () => {
    try {
    const locations = await Location.find().select('-_id -__v');

    locations.forEach(location => {
      this.map[location.key] = location;
    });

    } catch (err) {
      console.error(err.message);
    }
  }


  put = async (entry) => {
    try {
      const {title, place} = entry;

      let key = place;

      key += DELIMITER + this.getValues().reduce((index, cur) => {
        if (cur.place == place)
          index++;
        return index;
      }, 1);

      let location = new Location({
        key,
        title,
        place
      });
      this.map[key] = {key, title, place};
      location = await location.save();
     
      return {
        status: HttpStatus.CREATED,
        body: location
      };
    } catch (err) {
      console.error(err.message);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: "Server Error"
      };
    }
  }

  get = (key) => {
    return this.map[key];
  }

  getValues = () => {
    return Object.values(this.map);
  }

  getKeys = () => {
    return Object.keys(this.map);
  }
}

module.exports = LocationMap