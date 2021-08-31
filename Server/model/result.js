const mongoose = require("mongoose");

const result = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  testtime: { 
    type: Date,
    required: true, 
    default: Date.now
  }
});


module.exports = mongoose.model("result", result);
