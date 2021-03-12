const moment = require('moment-timezone');
const mongoose = require('mongoose');
const { Schema } = mongoose;

let timezoneNow = moment.tz.bind(null, Date.now(), "America/Sao_Paulo");

const schemaState = {
  name: {
    type: String,
    unique: true,
    dropDups: true,
    require: true
  },
  abbr: {
    type: String,
    unique: true,
    dropDups: true,
    require: true
  },
  created_at: {
    type: Date,
    default: timezoneNow
  },
  update_at: {
    type: Date,
    default: null
  }
};

module.exports = mongoose.model('State', new Schema(schemaState));

