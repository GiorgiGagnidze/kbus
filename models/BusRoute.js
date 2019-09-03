const mongoose = require('mongoose');

const BusRouteSchema = new mongoose.Schema({
  stops: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  quota: {
    type: Number,
    required: true
  },
  times: [
    {
      time: {
        type: Date,
        required: true
      }
    }
  ],
  reservations: [ 
    [
      {
        ticket: {
          type: Schema.Types.ObjectId,
          ref: 'tickets',
          required: true
        },
        checked: {
          type: Boolean,
          default: false,
        }
      }
    ]
  ],
  routes: [
    {
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      start: {
        type: Number,
        required: true
      },
      end: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = BusRoute = mongoose.model('busRoute', BusRouteSchema);