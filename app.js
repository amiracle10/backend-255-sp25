// setup.. this i similar to when we use our default tags in html
const express = require("express");
const Song = require("./models/song");
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const router = express.Router()
//we have to use cors in order to host a frontend and backend on the same device
// var cors = require('cors')
// activate or tell this app varibale to be an express server



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

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)