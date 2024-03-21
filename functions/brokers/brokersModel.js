const mongoose = require("mongoose");

const BrokerSchema = mongoose.Schema(
{
    brokerName: {
        type: String,
        required: true
    },
    brokerPhone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
          validator: function (v) {
            return v.length === 10;
          },
          message: (props) => `${props.value} is not a valid mobile number1!`,
        },
    },
    brokerCompanyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    brokerEmail: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Broker = mongoose.model("Brokers" , BrokerSchema);

module.exports = Broker;