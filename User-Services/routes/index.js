const Router = require("express").Router();
const {mongoose} = require("mongoose");
const User = require("../Modals/user.modal")
// const {default:axios} = require("axios")

Router.get('/users/:id',async(req,res)=>{
    try {

        const user = await User.findById(req.params.id);
        
        if(!user) return res.status(404).send("User not found ")
        res.send(user)
    } catch (error) {
            res.status(500).send("Error in retrieving User")        
    }



    });
    Router.get('/users',async(req,res)=>{
        try {
            const users = await User.find();
            if(!users) return res.status(404).send("User not found ")
            res.send(users)
            } catch (error) {
                res.status(500).send("Error in retrieving User")        
        }
    
    
    
        });

Router.post("/users",async(req,res)=>{
    const {name,email}=req.body;
    const newUser = new User({name,email}) 
    try {
        await newUser.save()
        res.status(201).send("Successfully added User")
    } catch (error) {
        res.status(500).send("Error in saving User")
    }
})

module.exports={Router}