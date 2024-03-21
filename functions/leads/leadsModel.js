const mongoose = require("mongoose");

const leadSchema = mongoose.Schema(
{
    ownerName: {
        type: String,
        required: true
    },
    ownerPhone: {
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
    monthlyRevenue: {
        type: Number,
        required: true,
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    SINno: {
        type: String,
        required: true
    },
    EINno: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    ownerEmail: {
        type: String,
        unique: true,
        required: true,
    },
});

const Leads = mongoose.model("Leads" , leadSchema);

module.exports = Leads;