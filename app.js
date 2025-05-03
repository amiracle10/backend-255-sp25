// setup.. this i similar to when we use our default tags in html
const express = require("express");
const Song = require("./models/song.js");
var cors = require('cors')
// const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users.js")

const app = express();
app.use(cors())
app.use(express.json())

const router = express.Router()
const secret = "supersecret"

//creating an new user
router.post("/user", async(req,res) =>{
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"});
        
    }

    const newUser = await new User({
        username: req.body.username, 
        password: req.body.password,
        status: req.body.status
    })
    
    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201) //created
    }
    catch(err){
        console.log(err)
    }

})

//authenticate or login

//post request- reason why is because when you login you are creating what we call a new 'session'
router.post("/auth", async(req,res) =>{
    if(!req.body.username || !req.body.password){
       res.status(401).json({error: "Missing username or password"})
       return
    }
    //find the user in the database
    let user = await User.findOne({username : req.body.username})

        // bad username
        if(!user){
            res.status(401).json({error:"Bad username"})
        }
        // check password
        else{
            if(user.password != req.body.password){
                res.status(401).json({error: "Bad password"})
            }
            // successful login attempt
            else{
                // create token encoded with jwt, and send username
                // also send back authorization
                // using boolean or number

                username2 = user.username
                const token = jwt.encode({username: user.username},secret)
                const auth = 1

                // respond with token
                res.json({
                    username2, 
                    token: token,
                    auth: auth
                })
            }
        }
    })

    //check status of user with a valid token, see if it matches the front ebnd token
router.get("/status", async(req,res) => {
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "missing x-auth"})

    }

    //if x-auth contains the token
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token,secret)

        //send abck all username and status fields to the user or front end
         let users = User.find({}, "username status")
         res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "invalid jwt"})
    }
})




//grab all the songs in a database
router.get("/songs", async(req,res) =>{
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch(err){
        console.log(err)
    }
})

//grab a single song in the database
router.get("/songs/:id", async (req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err){
        res.status(400).send(err)
    }
})


router.post("/songs", async(req,res) => {
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

 //update is to update an existing record/resource/database entry.. it uses a put request
 router.put("/songs/:id", async(req,res) => {
    //first we need to find and update the osng the front end wants us to update.
    //to do this we need to request the id of the song from request.
    //and then find it in the databse and update it
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)


    }
    catch (err){
        res.status(400).send(err)
    }
 })

 router.delete("/songs/:id", async(req,res) => {
    //method or function in mongoose/mongo to delete a single instance of a song or object
    try {
        const song = await Song.findById(req.params.id)
        console.log(song)
         await Song.deleteOne({_id: req.params.id})
         res.sendStatus(204)
    }

    catch(err){
        res.status(400).send(err)
    }
 })

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)