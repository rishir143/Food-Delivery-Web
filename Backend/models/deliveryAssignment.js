import mongoose from "mongoose";

const deliveryAssignmentSchmea = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },

    shopOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    bordcastedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["brodcasted", "assigned", "completed"],
      default: "brodcasted",
    },

    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);
const delivery = new mongoose.model("delivery", deliveryAssignmentSchmea);

export default delivery;
