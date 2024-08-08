const express = require("express");
const Users = require("./sample.json");
const cors = require('cors');
const fs=require("fs")

const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));

// Display all users
app.get("/Users", (req, res) => {
    return res.json(Users);
});
//Delete user detail
app.delete("/users/:id",(req,res)=>
{
    let id=Number(req.params.id);
    let filteredUsers=Users.filter((user)=>user.id!==id)
    fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data)=>
    {
        return res.json(filteredUsers);
    })
})
app.post("/Users",(req,res)=>
{
    let{name,age,city}=req.body;
    if(!name || !age || !city)
    {
        res.status(400).send({message:"all feild required"})
    }
    let id=Date.now();
    Users.push({id,name,age,city})
    fs.writeFile("./sample.json",JSON.stringify(Users),(err,data)=>
        {
            return res.json({"message":"User detail added Success"})
        })
    
})
app.patch("/Users/:id", (req, res) => {
    let id = Number(req.params.id);
    let { name, age, city } = req.body;
  
    if (!name || !age || !city) {
      return res.status(400).send({ message: "All fields are required" });
    }
  
    let index = Users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).send({ message: "User not found" });
    }
    Users.splice(index,1,{...req.body})
  
    Users[index] = { id, name, age, city }; // Update the user at the found index
  
    fs.writeFile("./sample.json", JSON.stringify(Users), (err) => {
      if (err) {
        return res.status(500).send({ message: "Error writing file" });
      }
      res.json({ message: "User detail updated successfully" });
    });
  });
  
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`App is running on port ${port}`);
    }
});
