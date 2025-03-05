const mongoose = require("mongoose");

const buyerServiceRequirementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  pricingModel: {
    type: String,
    default: "Per Hour",
    enum: ["Per Hour", "Per Day", "Per Job"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Approved", "Rejected", "Pending"],
  },
  listerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  listerAccountStatus: {
    type: String,
    default: "Active",
    enum: ["Active", "Suspended", "Banned"],
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

buyerServiceRequirementSchema.pre("save", async function(next){
    this.updatedAt = Date.now();

    const User = require("./User");

    const user = await User.findById(this.listerId).select("accountStatus");

    if(user) {
        this.listerAccountStatus = user.accountStatus;
    }
})

module.exports = mongoose.model(
  "BuyerServiceRequirement",
  buyerServiceRequirementSchema
);
