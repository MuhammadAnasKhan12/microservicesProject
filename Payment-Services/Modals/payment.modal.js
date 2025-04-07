const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    status: { type: String, required: true, default: 'pending' },
    amount: { type: Number, required: true },
    paidAt: { type: Date }
  });
  

const Payment = mongoose.model("Payment",paymentSchema);
module.exports = Payment;
