const Router=require("express").Router();
const {mongoose} = require("mongoose");
const Order = require("../Modal/order.modal");
const axios = require("axios");

Router.get("/orders/:userId",async(req,res)=>{
  
    try {
       
        const response = axios.get(`http://localhost:3001/users/${req.params.userId}`)
       
        const order = await Order.find({userId:req.params.userId})
        if(!order) return res.status(404).send("No order found")
        res.status(201).send({user:response.data, orders:userOrders})
           


    } catch (error) {
        res.status(500).send("error in fetching order data")    
    }

    
})


Router.get("/orders/",async(req,res)=>{
  
    try {
       
        const orders = await Order.find();
        if(!orders) return res.status(404).send("Order not found ")
        res.status(201).send(orders)


    } catch (error) {
        res.status(500).send("error in fetching orders")    
    }

    
})
Router.post("/orders",async(req,res)=>{
    const {userId,total} = req.body;
    try {
        const userResponse = await axios.get(`http://localhost:3001/api/users/${userId}`);
        console.log("USer Response",userResponse.data)
    if (!userResponse.data) {
      return res.status(404).send('User not found');
    }

    const newOrder = new Order({
      userId,
      total
    });

    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Error in posting data")
    }

    

})

Router.put("/orders/:orderId",async(req,res)=>{
    const {orderId}= req.params;
    const {status} = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        )
        if (!updatedOrder) {
            return res.status(404).send("Order not found");
        }
        res.status(200).send("Order status updated successfully")
        
    } catch (error) {   
        res.status(500).send("Error in updating status of order")
    }

})

module.exports={Router}