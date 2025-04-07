const Router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Payment = require("../Modals/payment.modal");
const { default: axios } = require("axios");

Router.post("/payments/:orderId",async(req,res)=>{
    const {amount} = req.body;

    if(!mongoose.Types.ObjectId.isValid(req.params.orderId)){
        return res.status(400).send("Invalid order")
    }
   
    const payment= new Payment({
        orderId:req.params.orderId,
        amount,
        status:"paid",
        paidAt:new Date(),
    })


    try {
        const savedPayment = await payment.save();

        const OrderServiceResponse =await axios.put(`http://localhost:3002/api/orders/${req.params.orderId}`,{
          status:"paid"
        })
        if (OrderServiceResponse.status !== 200) {
          return res.status(500).send("Failed to update order status");
         }

        res.status(201).send({ payment: savedPayment, orderStatusUpdated: true });
    }  catch (error) {
      console.error("Error during payment processing:", error);

      // if (error.response) {
      //     console.error("Order service error response:", error.response.data);
      //     res.status(500).send("Error updating order status. " + error.response.data);
      // } else if (error.request) {
      //     console.error("No response from Order Service:", error.request);
      //     res.status(500).send("Error connecting to Order Service");
      // } else {
      //     console.error("General error:", error.message);
      //     res.status(500).send("Error processing Payment");
      // }
  }})  

    Router.get("/payments/:orderId",async(req,res)=>{
      try {
        const payment = await Payment.findOne({orderId:req.params.orderId})
        
        if(!payment) return res.status(404).send("Payment not found")
        res.send(payment);
      } catch (error) {
        res.status(500).send("Error fetching payment")
        
      }

    })  


module.exports = { Router };