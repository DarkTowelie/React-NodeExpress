import express, { response } from 'express';
import {v4 as uuidv4} from 'uuid';
import fs from 'fs';
import cors from 'cors';

//EXPRESS--------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(cors());

function userExist(users, user){
  for(let u of users){
    if(u.email === user.email){
      return true;
    }
  }
  return false;
}

function isAdmin(users, user){
  for(let u of users){
    if(u.email === user.email){
      return u.isAdmin;
    }
   }
  return false;
}

app.get("/categories", (req, res)=>{
  let categories = [
    "Первые блюда",
    "Горячие закуски",
    "Детское меню",
    "Напитки"
  ]
  
  res.send({"categories" : categories});
})

app.get("/dishes", (req, res) => {
  fs.readFile("data/dishes.json", function(error,data){
    if(error) {
        return console.log(error);
    }
    res.send(data.toString());
  });
});

app.post("/isAdmin", (req, res) =>{
  let users = [];
  let user = req.body;
  fs.readFile("data/users.json", function(error,data){
    if(error) {
      res.send(false);
      return console.log(error);
    }
    users = JSON.parse(data.toString());
    res.send(isAdmin(users, user));
  });
});

app.post("/removeDish", (req, res)=>{
  let dishes = [];
  fs.readFile("data/dishes.json", function(error,data){
    if(error) {
      return console.log(error);
    }
    dishes = JSON.parse(data.toString());
    let dish = req.body;
    dishes = dishes.filter((d) => d.id != dish.id);
    fs.writeFile("data/dishes.json", JSON.stringify(dishes, null, 1), (err)=>{
      if(err){
        console.log(err);
      }
      res.send(true);
     })
  })
});

app.post("/addDish", (req, res)=>{
  let dishes = [];
  fs.readFile("data/dishes.json", function(error,data){
    if(error) {
      return console.log(error);
    }
    dishes = JSON.parse(data.toString());
    let newDish = req.body;
    newDish.category = "Новое блюдо";
    newDish.id = uuidv4();
    newDish.days = [1,2,3,4,5,6,0];
    
    dishes.push(newDish);
    
    fs.writeFile("data/dishes.json", JSON.stringify(dishes, null, 1), (err)=>{
      if(err){
        console.log(err);
      }
     });
  });
  res.send(true);
});

app.post("/addUser", (req, res)=>{
  let users = [];
  fs.readFile("data/users.json", function(error,data){
    if(error) {
      res.send(JSON.stringify(false));
      return console.log(error);
    }
    users = JSON.parse(data.toString());

    let user = req.body;
    if(!userExist(users, user))
    {
      user.isAdmin = false;
      users.push(user);
    }

    let usersStr = JSON.stringify(users);
    fs.writeFile("data/users.json", usersStr, (err)=>{
      if(err){
        console.log(err);
      }
     })

     res.send();
  });
})

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started!");
});