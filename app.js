// setup.. this i similar to when we use our default tags in html
const express = require("express")
//we have to use cors in order to host a frontend and backend on the same device
var cors = require('cors')
// activate or tell this app varibale to be an express server
const app = express()
app.use(cors())
const router = express.Router()


//start the web server... app.listen(portnumber, funciton)


//making an api using routes
// Routes are used to handle browser requrests. They look like URls. The difference is that when a browsers request a route, it is dynamically, handled by using a function. 

//GET or a regular request when someone goes to http://localhost:3000/hello. when using a funciton an a route, we almost always have a prameter or handle a response and request

router.get("/songs", function(req,res){
    const songs = [{
        title: "We Found love",
        artist: "Rihanna",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrel Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        }
    ];
  

    res.json(songs)
})

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)