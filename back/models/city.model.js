const moment = require('moment-timezone');
const mongoose = require('mongoose');
const { Schema } = mongoose;

let timezoneNow = moment.tz(Date.now(), "America/Sao_Paulo");

const schemaCity = {
  name: {
    type: String,
    require: true,
    unique: true,
    dropDups: true
  },
  created_at: {
    type: Date,
    default: timezoneNow
  },
  update_at: {
    type: Date,
    default: null
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'State'
  }
};

module.exports = mongoose.model('Cidade', new Schema(schemaCity));

